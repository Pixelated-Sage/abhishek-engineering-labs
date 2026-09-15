const http = require('http');

const PORT = 3000;
const data = [{
    id: 1,
    name: "Abhishek"
}]

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;


    console.log(`received a ${method} request from ${url}`);


    if (url === '/' && method === 'GET') {
        res.writeHead(200, { "content-type": "text/html" });
        res.write('<h1>Welcome to the home page<h1>')
        res.end();
    } else if (url === '/users' && method === 'GET') {
        res.writeHead(200, { "content-type": "application/json" });
        res.end(JSON.stringify(data));
    } else if (url === '/users' && method === 'POST') {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk.toString();
        })

        req.on('end', () => {
            const user = JSON.parse(body);
            const Name = user.name;
            console.log(Name)

            if (user.name && user.name.trim()!=="") {
                data.push({
                    id: data.length + 1,
                    name: user.name
                })
                res.writeHead(201, { "content-type": "application/json" })
                res.end(JSON.stringify({ message: "User created Successfully" }))
            }

            else {
                res.writeHead(400, { "content-type": "text/plain" });
                res.end("Please enter name")
            }
        });
    }

    else {
        res.writeHead(404, { "content-type": "text/plain" });
        res.end("404 page not found")
    }
})

server.listen(PORT, () => {
    console.log("server is running at http://localhost:3000")
})