const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const PORTS = [8080, 8081, 5173, 5000, 3001, 8888];
const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

function tryListen(portIndex = 0) {
  if (portIndex >= PORTS.length) {
    console.error('Tous les ports essayés sont occupés.');
    process.exit(1);
  }

  const port = PORTS[portIndex];
  const server = http.createServer((req, res) => {
    let reqPath = decodeURI(req.url.split('?')[0]);
    if (reqPath === '/' || reqPath === '') {
      reqPath = '/index.html';
    }

    const filePath = path.join(__dirname, reqPath);

    if (!filePath.startsWith(__dirname)) {
      res.writeHead(403);
      res.end('Access Denied');
      return;
    }

    fs.stat(filePath, (err, stats) => {
      if (err || !stats.isFile()) {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=UTF-8' });
        res.end('404 Not Found');
        return;
      }

      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';

      res.writeHead(200, {
        'Content-Type': contentType,
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-cache'
      });

      const stream = fs.createReadStream(filePath);
      stream.pipe(res);
    });
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${port} occupé, tentative sur le port suivant...`);
      tryListen(portIndex + 1);
    } else {
      console.error('Erreur serveur:', err);
    }
  });

  server.listen(port, '0.0.0.0', () => {
    console.log(`=================================================`);
    console.log(`✂️  France Laure Coiffure - Serveur Local Actif`);
    console.log(`🌐  URL Locale : http://localhost:${port}`);
    console.log(`=================================================`);

    exec(`start http://localhost:${port}`);
  });
}

tryListen(0);
