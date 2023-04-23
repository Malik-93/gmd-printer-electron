const http = require('http');
const app = require('./app');
const server = http.createServer(app);
const port = process.env.PORT || 5050;
server.listen(port, () => {
    console.log(`Node server is listening on port ${port}`)
})