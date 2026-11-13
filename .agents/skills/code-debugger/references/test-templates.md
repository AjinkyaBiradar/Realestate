# Test templates

## pytest
```python
import pytest
from mymodule import func

@pytest.mark.parametrize("inp, expected", [
    ([], 0),            # empty
    ([1], 1),           # single
    ([1, 2, 3], 6),     # typical
    ([-1, 1], 0),       # negatives
])
def test_func_values(inp, expected):
    assert func(inp) == expected

def test_func_rejects_none():
    with pytest.raises(TypeError):
        func(None)

def test_regression_issue_123():
    """Bug: duplicates were double counted."""
    assert func([2, 2]) == 4
```

## Vitest / Jest
```ts
import { describe, it, expect } from 'vitest';
import { func } from './mymodule';

describe('func', () => {
  it.each([
    [[], 0],
    [[1], 1],
    [[1, 2, 3], 6],
  ])('func(%j) = %i', (input, expected) => {
    expect(func(input)).toBe(expected);
  });

  it('throws on null', () => {
    expect(() => func(null as any)).toThrow();
  });
});
```

## Mocking external boundaries (pytest)
```python
def test_fetch_handles_timeout(monkeypatch):
    def boom(*a, **k): raise TimeoutError
    monkeypatch.setattr("mymodule.requests.get", boom)
    assert fetch("http://x") is None
```
