const http = require('http');

const server = http.createServer((req, res) => {
    // Set the response header with a status code of 200 (OK) and content type
    res.writeHead(200, { 'Content-Type': 'text/plain' });

    // Send the response body
    res.end('Hello World, This is my Node.js server\n');
});

// Define the port to listen on
const PORT = process.env.PORT || 10000;

// Start the server and listen on the specified port
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
