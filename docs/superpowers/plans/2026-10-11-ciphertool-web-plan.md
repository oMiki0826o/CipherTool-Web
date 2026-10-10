# CipherTool Web Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a static Next.js web client for the existing CipherTool functionality.

**Architecture:** Pure cipher/encoding functions live in `lib/tools`; a registry describes each route and parameter form; App Router pages compose a shared workbench. No server actions or data uploads are used.

**Tech Stack:** Next.js, React, TypeScript, Vitest, Web Crypto API, GitHub Pages Static Export.

**Spec:** `docs/superpowers/specs/2026-10-11-ciphertool-web-design.md`

## Global Constraints

- Keep the original `ciphertool/` repository unchanged.
- Keep all transformations in the browser.
- Classical ciphers are educational, not modern secure encryption.
- Use Traditional Chinese UI copy with concise English labels.
- Ignore `data/` and local AI collaboration records.

## Review Focus

- Empty input: output must be empty and never throw.
- Unicode input: tools must preserve characters where their algorithm allows it.
- Invalid numeric keys: normalize to a safe value and show no runtime error.
- Unicode Base64: encode UTF-8 rather than corrupting non-ASCII text.
- GitHub Pages base path: internal links and static assets must use relative-compatible routes.

### Task 1: Project skeleton and governance

- [ ] Create package, Next config, app shell, README, license, AGENTS.md and workflow.
- [ ] Add static export and 404.
- [ ] Verify typecheck and build.

### Task 2: Pure tool library

- [ ] Add cipher/encoding functions and registry.
- [ ] Add Vitest coverage for round trips, Unicode and invalid parameters.
- [ ] Verify tests.

### Task 3: Workbench UI

- [ ] Add tool index and dynamic tool route.
- [ ] Add textarea, parameter controls, output copy/download/clear, theme toggle and responsive CSS.
- [ ] Verify static routes and browser build.

### Task 4: Documentation and release gate

- [ ] Complete bilingual README and third-party/source notes.
- [ ] Add static route checker and CI workflow.
- [ ] Run test, typecheck and build, then commit and push.
