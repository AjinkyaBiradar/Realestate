---
name: code-debugger
description: Test code, find bugs, fix errors, and minimize/refactor code. Use whenever the user shares code or an error message/stack trace, says something is broken, failing, crashing, slow, or "not working", asks to write or run tests (unit, integration, edge cases), asks to review code for bugs, or wants code shortened, simplified, deduplicated, or cleaned up. Trigger even if the user only pastes an error with no instructions, in any language (Python, JavaScript/TypeScript, Java, C/C++, Go, Rust, SQL, etc.).
---

# Code Debugger

Four jobs: **fix errors**, **find bugs**, **test code**, **minimize code**. Identify which the user wants (often several) and follow the matching workflow. Always prefer running code over reasoning about it when a sandbox is available.

## Core rules
1. **Reproduce first.** Run the code or failing test and capture the exact error before changing anything. Never "fix" from a guess alone.
2. **Root cause, not symptom.** Don't silence errors with try/except, `// @ts-ignore`, or null-guards unless that is truly the correct behavior.
3. **Smallest correct change.** Fix only what is broken; don't rewrite unrelated code.
4. **Verify after every change.** Re-run the repro and the tests. Report what passed.
5. **Preserve behavior when minimizing.** Tests must pass before and after.

## Workflow A: Solving errors
1. Read the full error: type, message, file, line, and the **bottom-most frame in the user's own code**.
2. Reproduce (see Core rules). If missing info (versions, input, environment), ask one focused question or state your assumption.
3. Form 1–3 hypotheses ranked by likelihood. Check cheapest first (print/log, inspect types and values, minimal repro, `git diff`/`git bisect` if a regression).
4. Apply the fix, re-run, confirm.
5. Report: **Cause** (one sentence) → **Fix** (the diff) → **Verified** (what you ran).

Common-error checklist: see `references/common-errors.md`.

## Workflow B: Finding bugs (code review)
Scan in this order and list findings by severity (Critical / Major / Minor), each with file:line, why it's wrong, and a fix:
1. **Correctness**: off-by-one, wrong operator, inverted condition, mutated shared state, mutable default args, integer overflow, float equality, wrong variable shadowed.
2. **Edge cases**: empty/None/null, zero, negative, huge input, unicode, duplicates, unsorted data, timezones.
3. **Error handling**: swallowed exceptions, unchecked return values, missing `await`, unclosed files/connections, resource leaks.
4. **Concurrency**: race conditions, shared mutable state, deadlocks, async misuse.
5. **Security**: injection (SQL/shell/XSS), unsanitized input, hardcoded secrets, unsafe deserialization, path traversal.
6. **Performance**: N+1 queries, accidental O(n²), repeated work in loops, unnecessary copies.

Don't invent bugs. If something looks wrong but you're unsure, say so and show how to confirm it.

## Workflow C: Testing code
1. Pick the project's existing framework (pytest, unittest, Jest/Vitest, JUnit, `go test`, `cargo test`). Default: **pytest** for Python, **Vitest/Jest** for JS/TS.
2. Cover, for each public function: **happy path**, **boundaries** (0, 1, max, empty), **invalid input** (expected exceptions), **edge cases** from Workflow B, and a **regression test** for every bug fixed.
3. Test behavior, not implementation. One logical assertion focus per test; descriptive names (`test_returns_empty_list_when_no_matches`).
4. Use parametrization for input tables. Mock only external boundaries (network, DB, clock, filesystem).
5. **Run the tests.** Fix failures that are test mistakes; report failures that are real bugs. Show the pass/fail summary and, if tools allow, coverage (`pytest --cov`, `vitest --coverage`).

Templates: see `references/test-templates.md`.

## Workflow D: Minimizing code
Goal: fewer lines **and** equal or better readability. Never golf at the cost of clarity.
1. Make sure tests exist and pass (write them first if not, Workflow C).
2. Apply, in order: delete dead code/unused imports/vars → remove duplication (extract function) → use built-ins/stdlib instead of hand-rolled loops → flatten nesting with early returns → replace verbose patterns with idioms (comprehensions, `map/filter`, destructuring, optional chaining, ternary for simple cases).
3. Re-run tests. Report **before/after line count** and what changed.
4. Don't remove error handling, validation, or comments explaining *why*.

## Output format
Keep replies tight:
- **Errors:** Cause → Fix → Verified.
- **Bug review:** severity-sorted list with file:line.
- **Tests:** the test file + run results.
- **Minimizing:** minimized code + before/after count.
Deliver code in files when it's more than ~20 lines; otherwise inline. Don't pad with long explanations after the work is done.
