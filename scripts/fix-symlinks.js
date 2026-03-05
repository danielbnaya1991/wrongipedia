// Replace symlinks in .next/node_modules with actual copies (fixes Windows EPERM on Netlify plugin)
const fs = require('fs');
const path = require('path');

function fixSymlinks(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isSymbolicLink()) {
      const target = fs.readlinkSync(fullPath);
      const resolvedTarget = path.resolve(dir, target);
      if (fs.existsSync(resolvedTarget)) {
        fs.rmSync(fullPath, { recursive: true, force: true });
        fs.cpSync(resolvedTarget, fullPath, { recursive: true });
        console.log(`Replaced symlink: ${entry.name} -> copied from ${target}`);
      }
    }
  }
}

// Fix all .next node_modules directories
const dirs = ['.next/node_modules', '.next/dev/node_modules', '.next/standalone/.next/node_modules'];
for (const dir of dirs) {
  const fullDir = path.join(process.cwd(), dir);
  fixSymlinks(fullDir);
}
console.log('Symlink fix complete.');
