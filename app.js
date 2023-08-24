"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const http = __importStar(require("http"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const querystring = __importStar(require("querystring"));
const port = 5000;
const server = http.createServer((request, response) => {
    if (request.method === 'GET') {
        const filePath = path.join(__dirname, 'static', 'index.html');
        fs.readFile(filePath, 'utf-8', (error, data) => {
            if (error) {
                response.writeHead(500, { 'Content-Type': 'text/plain' });
                response.end('Internal Server Error');
            }
            else {
                response.writeHead(200, { 'Content-Type': 'text/html' });
                response.write(data);
                response.end();
            }
        });
    }
    else if (request.method === 'POST') {
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
            response.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
            response.write(`Role 1: ${role_1}\n`);
            response.write(`Text 1: ${text_1}\n`);
            response.write(`Role 2: ${role_2}\n`);
            response.write(`Text 2: ${text_2}\n`);
            response.end();
        });
    }
    else {
        response.writeHead(404, { 'Content-Type': 'text/plain' });
        response.end('Not Found');
    }
});
server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
