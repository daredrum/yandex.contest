const http = require('http');
const { script, style } = require('./index.js')([]);
const port = 3000;

const server = http.createServer((request, response) => {
    response.end(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <style type="text/css">${style}</style>
        </head>
        <body>
        <div class="world"></div>
        <script type="text/javascript">${script}</script>
        </body>
        </html>
    `);
});

server.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }

    console.log(`server is listening on ${port}`)
});
