/**
 * Code Debugger Build Verification Script
 * Based on code-debugger skill (Workflow A, B, C, D)
 * Automatically runs during build lifecycle to detect errors, verify type safety,
 * and validate production bundle integrity.
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('\n🔍 [code-debugger] Running post-build verification...');

let hasErrors = false;
const issues = [];

// 1. Verify Next.js build output
const nextDir = path.join(process.cwd(), '.next');
if (!fs.existsSync(nextDir)) {
  issues.push('Critical: .next build directory was not generated.');
  hasErrors = true;
} else {
  console.log('  ✓ Build directory (.next) verified.');
}

// 2. Type-checking validation (TypeScript)
try {
  console.log('  🔍 Verifying TypeScript type safety (tsc --noEmit)...');
  execSync('npx tsc --noEmit', { stdio: 'pipe' });
  console.log('  ✓ TypeScript check passed: 0 type errors.');
} catch (err) {
  const output = err.stdout ? err.stdout.toString() : err.message;
  issues.push(`TypeScript error:\n${output}`);
  hasErrors = true;
}

// 3. Static code quality checks
try {
  console.log('  🔍 Verifying ESLint rules...');
  execSync('npm run lint', { stdio: 'pipe' });
  console.log('  ✓ ESLint check passed: 0 lint errors.');
} catch (err) {
  const output = err.stdout ? err.stdout.toString() : err.message;
  // Warning vs error check
  if (output.includes('error')) {
    issues.push(`Lint errors:\n${output}`);
    hasErrors = true;
  } else {
    console.log('  ⚠ Lint warnings noted.');
  }
}

// 4. Output Summary matching code-debugger format
console.log('\n═══════════════════════════════════════════════');
console.log(' 🛠️  CODE-DEBUGGER BUILD VERIFICATION REPORT');
console.log('═══════════════════════════════════════════════');

if (hasErrors) {
  console.error('\n❌ Build verification FAILED:');
  issues.forEach((issue, idx) => {
    console.error(`\n[Issue ${idx + 1}]:\n${issue}`);
  });
  console.error('\nPlease apply the smallest correct change and re-verify.');
  process.exit(1);
} else {
  console.log('\n✅ All build checks PASSED successfully:');
  console.log('   • Build bundle: Verified');
  console.log('   • Type safety: 0 errors');
  console.log('   • Code quality: Verified');
  console.log('═══════════════════════════════════════════════\n');
  process.exit(0);
}

