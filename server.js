const { createServer } = require('node:http');
const next = require('next');

const port = Number(process.env.PORT || 3000);
const hostname = process.env.HOST || process.env.HOSTNAME || '0.0.0.0';
const dev = process.env.NODE_ENV !== 'production';

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    createServer((request, response) => {
      handle(request, response);
    }).listen(port, hostname, () => {
      console.log(`EterSolis web server listening on http://${hostname}:${port}`);
    });
  })
  .catch((error) => {
    console.error('Failed to start EterSolis web server', error);
    process.exit(1);
  });
