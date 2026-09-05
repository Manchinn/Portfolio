---
lang: en
title: "ZCode first run: a review-before-run workflow"
excerpt: "A small, repeatable runbook for opening ZCode, asking for one bounded change, reviewing the plan, and checking the result."
category: "AI coding workflow"
readTime: "6 min"
publishedAt: "2026-08-28"
tags: ["ZCode", "AI coding", "runbook"]
draft: false
---

## Why start with a small run?

An AI coding tool is easier to evaluate when the task has a clear boundary. A first run should produce one visible result, use a small number of files, and leave an obvious way to check whether the request was met.

This runbook uses a single static HTML page. The point is not the page itself. The point is to practice the loop: **prompt → plan → review → approve → preview → verify**.

## Prepare the workspace

Open an empty project folder in ZCode and keep the first request deliberately narrow. The following prompt is designed to avoid unnecessary dependencies:

```text
Create one index.html file containing a small personal introduction page.
Use plain HTML, CSS, and JavaScript in that file only.
Do not add a framework, package, CDN, or other file.
Include a name, a short introduction, and a button with a visible hover state.
Use a white and blue visual style. Make it open directly in the preview.
```

The constraint about one file makes the result easy to inspect. It also gives the tool fewer opportunities to create work that was not requested.

## Review the plan before approval

When ZCode proposes a plan or asks to make changes, pause before approving it. Check three things:

1. **Files:** does the proposed change contain only `index.html`?
2. **Dependencies:** did it add a package, CDN, remote script, or unrelated asset?
3. **Commands:** does it want to run a terminal command, and do you understand what that command will do?

If any part is outside the request, ask the tool to explain it or reduce the scope. Approval is a decision about a concrete change, not a signal to trust every next step.

## Verify the result in the preview

After approval, inspect the changed file and open the preview using the controls available in your installed ZCode version. Confirm the page has the requested name, introduction, button, and hover state.

If the preview does not match the request, compare the result with the original prompt. Ask for an incremental correction that names the missing requirement. Starting over makes it harder to tell which change caused the problem.

## A reusable review checklist

- Is every requirement present?
- Are the changed files the ones you expected?
- Did the tool add an unfamiliar dependency or remote resource?
- Did any terminal command run, and was it necessary?
- Does the result work in the preview, not only in the editor?
- Did the tool expose a secret, token, private URL, or personal data?

This checklist is short enough to use on every run. It turns an AI coding session into an observable workflow instead of an opaque button press.

## What changes between releases

Menu names, preview locations, model names, limits, and pricing can change. Verify those details against the version you are using on the day of the run. The stable part of this note is the review habit and the bounded-task loop.
