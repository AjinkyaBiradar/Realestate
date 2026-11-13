# Antigravity Workspace Rules — Code Debugger & Quality Gate

## Code Debugger Skill Integration
Whenever writing, modifying, debugging, or building code in this repository:
1. Always apply the rules and workflows from the **code-debugger** skill located in `.agents/skills/code-debugger/SKILL.md`.
2. Follow the 5 core rules:
   - **Reproduce first**: Never fix from an assumption alone; capture the exact error trace before making changes.
   - **Root cause, not symptom**: Avoid masking issues with silent try/except or `@ts-ignore`.
   - **Smallest correct change**: Modify only what is required to fix the issue.
   - **Verify after every change**: Re-run the build (`npm run build`) and verify with `npm run code-debug`.
   - **Preserve behavior when minimizing**: Ensure all existing features and pages continue working.

## Build Lifecycle Verification
Every time the code is built (`npm run build`):
- The `postbuild` script automatically executes `scripts/code-debugger.js` to verify type safety, lint rules, and bundle integrity.
- If any build or type error is detected, address the root cause and re-verify until all checks pass.

