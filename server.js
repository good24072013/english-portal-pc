// Kiçik yerli server: "local" rejimində site/ qovluğunu http://127.0.0.1 üzərindən verir (SPA fallback ilə).
const http = require('http');
const fs = require('fs');
const path = require('path');
const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8', '.webmanifest': 'application/manifest+json', '.svg': 'image/svg+xml',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.ico': 'image/x-icon', '.woff2': 'font/woff2',
  '.pdf': 'application/pdf', '.txt': 'text/plain; charset=utf-8'
};
function handler(root) {
  root = path.resolve(root);
  return (req, res) => {
    let p;
    try { p = decodeURIComponent(req.url.split('?')[0]); } catch (e) { res.writeHead(400); return res.end(); }
    let f = path.resolve(root, '.' + p);
    if (f !== root && !f.startsWith(root + path.sep)) { res.writeHead(403); return res.end(); }
    try { if (fs.statSync(f).isDirectory()) f = path.join(f, 'index.html'); } catch (e) {}
    if (!fs.existsSync(f)) {
      if (path.extname(p)) { res.writeHead(404); return res.end('Not found'); }
      f = path.join(root, 'index.html');
    }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(f).toLowerCase()] || 'application/octet-stream', 'Cache-Control': 'no-cache' });
    fs.createReadStream(f).pipe(res);
  };
}
function startServer(root, port) {
  return new Promise((resolve, reject) => {
    const s = http.createServer(handler(root));
    s.once('listening', () => resolve(s.address().port));
    s.on('error', (e) => { if (e.code === 'EADDRINUSE' && port !== 0) s.listen(0, '127.0.0.1'); else reject(e); });
    s.listen(port, '127.0.0.1');
  });
}
module.exports = { startServer, handler };
