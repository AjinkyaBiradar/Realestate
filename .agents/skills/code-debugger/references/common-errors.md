# Common errors, quick causes

## Python
- `AttributeError: 'NoneType' ...` → a function returned None (missing `return`, failed lookup). Trace where the value came from.
- `KeyError` / `IndexError` → missing key or out-of-range; use `.get()` or check length.
- `TypeError: unsupported operand` → mixed types (str + int, None + int).
- `ModuleNotFoundError` → not installed, wrong venv, or circular/local-name shadowing (file named like a stdlib module).
- `RecursionError` → missing/incorrect base case.
- Mutable default argument (`def f(x=[])`) → shared state across calls.
- `UnboundLocalError` → assigning to a global name inside a function without `global`.

## JavaScript / TypeScript
- `Cannot read properties of undefined` → undefined chain; check data shape/timing, use `?.` only if undefined is valid.
- `X is not a function` → wrong import (default vs named), `this` binding lost.
- Promise never resolves / stale data → missing `await`, un-returned promise, async in `forEach`.
- React: infinite re-render → state set in render or bad `useEffect` deps; stale closure → missing deps.
- `CORS` errors → server headers, not client code.
- TS errors → fix the type, don't cast to `any`.

## Java / C# / C++
- `NullPointerException` / `NullReferenceException` → uninitialized object, missing null check at boundary.
- `ConcurrentModificationException` → mutating a collection while iterating.
- Segfault / `std::bad_alloc` → dangling pointer, out-of-bounds, use-after-free; run with ASan/Valgrind.
- Linker errors → missing definition/library flag.

## SQL / backend
- Wrong row counts → join fan-out or `NULL` comparison (`= NULL` instead of `IS NULL`).
- Deadlock/timeouts → long transactions, missing index, inconsistent lock order.
- 500 errors → read server logs first, not the client.

## Environment
- Works locally, fails in CI → version mismatch, env vars, path case-sensitivity, timezone.
- Dependency conflicts → pin versions, check lockfile, fresh venv.
