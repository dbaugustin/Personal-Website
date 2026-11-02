(function () {
  var box = document.querySelector('.pdf');
  if (!box || !window.pdfjsLib) return;
  pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
  var doc;
  function render() {
    var width = box.clientWidth;
    // Render above screen resolution so text stays sharp after the browser scales it down.
    var ratio = Math.min(Math.max(window.devicePixelRatio || 1, 1) * 2, 4);
    var pages = [];
    for (var i = 1; i <= doc.numPages; i++) pages.push(doc.getPage(i));
    return Promise.all(pages).then(function (list) {
      var frag = document.createDocumentFragment();
      return Promise.all(list.map(function (page) {
        var base = page.getViewport({ scale: 1 });
        var vp = page.getViewport({ scale: (width / base.width) * ratio });
        var c = document.createElement('canvas');
        c.width = vp.width; c.height = vp.height;
        c.setAttribute('aria-label', 'Resume page ' + page.pageNumber);
        frag.appendChild(c);
        return page.render({ canvasContext: c.getContext('2d'), viewport: vp }).promise;
      })).then(function () { box.replaceChildren(frag); });
    });
  }
  pdfjsLib.getDocument(box.dataset.src).promise.then(function (d) {
    doc = d;
    return render();
  }).catch(function () {
    var p = box.querySelector('.pdf-fallback');
    if (p) p.firstChild.textContent = "The resume couldn't load here. ";
  });
  var t, lastW = box.clientWidth;
  window.addEventListener('resize', function () {
    clearTimeout(t);
    t = setTimeout(function () {
      if (doc && Math.abs(box.clientWidth - lastW) > 40) { lastW = box.clientWidth; render(); }
    }, 200);
  });
})();
