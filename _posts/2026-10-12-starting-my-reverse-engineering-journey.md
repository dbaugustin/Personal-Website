---
layout: post
title: "Starting my reverse engineering journey"
category: reverse-engineering
tags: [malware, assembly, win32, notes]
summary: "Where I'm starting with malware RE: x86 assembly, the Win32 API, and the resources I'm learning from."
---

In Spring 2027 I'm doing a faculty-advised directed study in malware reverse engineering with Ghidra and debuggers. I want to show up with the fundamentals already in place, so I've started early. This series is where I'll log what I learn as I go.

## What I've started on

- **Low-level assembly.** Reading disassembly is most of reverse engineering, so I'm learning how registers, the stack, and calling conventions work at the instruction level.
- **The Win32 API.** Most Windows malware does its real work through Win32 API calls, like allocating memory, writing to other processes, or touching the registry. Knowing what those functions do makes it much easier to guess what a sample is trying to do.

## Resources I'm using

- [pwn.college](https://pwn.college/): hands-on modules covering assembly and low-level fundamentals
- [Malware Development: Processes, Threads, and Handles](https://youtu.be/aNEqC-U5tHM) by crow on YouTube

## What's next

I'll write up each topic as I work through it, and once I start pulling apart real samples in Ghidra, those will go here too.
