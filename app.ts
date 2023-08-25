import * as http from 'http';
import * as fs from 'fs';
import * as path from 'path';
import * as querystring from 'querystring';

const port = 5000;

const server = http.createServer((request, response) => {
  if (request.method === 'GET') {
    const filePath = path.join(__dirname, 'docs', 'index.html');
    fs.readFile(filePath, 'utf-8', (error, data) => {
      if (error) {
        response.writeHead(500, { 'Content-Type': 'text/plain' });
        response.end('Internal Server Error');
      } else {
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.write(data);
        response.end();
      }
    });
  } else if (request.method === 'POST') {
    let requestData = '';

    request.on('data', chunk => {
      requestData += chunk.toString();
    });

    request.on('end', () => {
      const decodedData = querystring.parse(requestData);

      if (!decodedData['role_1'] || !decodedData['text_1'] || !decodedData['role_2'] || !decodedData['text_2']) {
        response.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
        response.end('全ての項目を入力してください。');
        return;
      }

      const role_1 = decodedData['role_1'];
      const text_1 = decodedData['text_1'];
      const role_2 = decodedData['role_2'];
      const text_2 = decodedData['text_2'];

      response.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8'});
      response.write(`Role 1: ${role_1}\n`);
      response.write(`Text 1: ${text_1}\n`);
      response.write(`Role 2: ${role_2}\n`);
      response.write(`Text 2: ${text_2}\n`);
      response.end();
    });
  } else {
    response.writeHead(404, { 'Content-Type': 'text/plain' });
    response.end('Not Found');
  }

});

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
