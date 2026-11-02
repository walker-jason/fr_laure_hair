const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');
const css = fs.readFileSync('css/style.css', 'utf8');
const js = fs.readFileSync('js/main.js', 'utf8');

// Ensure we don't duplicate if already embedded
if (!html.includes('<style id="luxury-salon-styles">')) {
  const styleBlock = `
  <link rel="stylesheet" href="css/style.css">
  <style id="luxury-salon-styles">
${css}
  </style>`;

  html = html.replace('<link rel="stylesheet" href="css/style.css">', styleBlock);
}

if (!html.includes('<script id="luxury-salon-scripts">')) {
  const scriptBlock = `
  <script src="js/main.js"></script>
  <script id="luxury-salon-scripts">
${js}
  </script>`;

  html = html.replace('<script src="js/main.js"></script>', scriptBlock);
}

fs.writeFileSync('index.html', html, 'utf8');
console.log('✓ Inlined CSS and JS into index.html successfully!');
