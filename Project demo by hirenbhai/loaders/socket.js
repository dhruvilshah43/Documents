const http = require('http');
const https = require('https');
const fs = require('fs');

const socketIO = require('socket.io');

const { SERVER_TYPE, RANDOM_STR } = require("../modules");

module.exports = () => {
    let KEY_FILE = config.KEY_FILE, CRT_FILE = config.CRT_FILE;
    if (fs.existsSync(KEY_FILE) && fs.existsSync(CRT_FILE)) {
        let options = {
            key: fs.readFileSync(KEY_FILE),
            cert: fs.readFileSync(CRT_FILE)
        };
        console.log("Creating HTTPS App")
        server = https.createServer(options, app);
    } else {
        console.log("Creating HTTP App")
        server = http.createServer(app);
    }

    if (SERVER_TYPE == 'SOCKET') {
        createSocketServer();
    }
}

function createSocketServer() {
    console.log("Creating socket server...")
    io = socketIO(server, {
        transports: ['websocket', 'polling', 'xhr-polling', 'flashsocket'],
        pingInterval: 10000, // to send ping/pong events for specific interval (milliseconds)
        pingTimeout: 10000, // if ping is not received in the "pingInterval" seconds then milliseconds will be disconnected in "pingTimeout" milliseconds
    });

    io.sockets.on("connection", function (client) {
        console.log("client Connected : ", client.id, new Date());

        client.conn.on('packet', function (packet) {
            if (packet.type === 'ping') {
                // c("Ping received......")
            }
        });

        client.on('error', function (error) {
            console.log('client error...,', error)
        });
    });
}
