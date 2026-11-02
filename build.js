const fs = require('fs');
const path = require('path');

function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      if (entry.name !== 'node_modules' && entry.name !== '.git' && entry.name !== 'public' && entry.name !== 'dist') {
        copyDir(srcPath, destPath);
      }
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

console.log('⚡ Préparation de la version de déploiement Vercel...');

// Populate public/
copyDir(__dirname, path.join(__dirname, 'public'));
console.log('✓ Dossier public/ généré');

// Populate dist/
copyDir(__dirname, path.join(__dirname, 'dist'));
console.log('✓ Dossier dist/ généré');

console.log('🎉 Build Vercel terminé avec succès !');
