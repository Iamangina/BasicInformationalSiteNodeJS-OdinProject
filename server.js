const http = require('http');
const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

const server = http.createServer((req, res) => {
    let filePath = path.join(__dirname, 'views');

    let title = '';

    if (req.url.startsWith('/public/')) {
    const filePath = path.join(__dirname, req.url);

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.statusCode = 404;
            return res.end('Not found');
        }

        const ext = path.extname(filePath);

        const map = {
            '.css': 'text/css'
        };

        res.setHeader('Content-Type', map[ext] || 'text/plain');
        res.end(data);
    });

    return;
}

    switch(req.url){
        case '/':
            filePath = path.join(filePath, 'index');
            title = 'Home';
            res.statusCode = 200;
            break;

        case '/about':
            filePath = path.join(filePath, 'about');
            title = 'About';
            res.statusCode = 200;
            break;

        case '/contact':
            filePath = path.join(filePath, 'contact-me');
            title = 'Contact';
            res.statusCode = 200;
            break;

        default:
            filePath = path.join(filePath, '404');
            title = '404';
            res.statusCode = 404;
            break;
    }

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'text/plain');
            return res.end('Error');
        }

        const rendered = ejs.render(data, { title }, {
            filename: filePath
        });

        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.end(rendered);
    });
});

server.listen(8080, () => {
    console.log('Serwer');
});