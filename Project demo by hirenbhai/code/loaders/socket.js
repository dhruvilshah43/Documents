module.exports = () => {

    let KEY_FILE = path.join(__dirname, process.env.KEY_FILE), CRT_FILE = path.join(__dirname, process.env.CRT_FILE);
    if (fs.existsSync(KEY_FILE) && fs.existsSync(CRT_FILE)) {
        // creating https secure socket server
        let options = {
            key: fs.readFileSync(KEY_FILE),
            cert: fs.readFileSync(CRT_FILE)
        };
        console.log("creating https app")
        server = https.createServer(options, app);
    } else {
        // creating http server
        console.log("creating http app")
        server = http.createServer(app);
    }

    io = socketIO(server,{
        transports: ['websocket', 'polling', 'xhr-polling', 'flashsocket'],
        pingInterval: 10000, // to send ping/pong events for specific interval (milliseconds)
        pingTimeout: 10000, // if ping is not received in the "pingInterval" seconds then milliseconds will be disconnected in "pingTimeout" milliseconds
    });

    io.sockets.on("connection", function(client) {
        console.log("client Connected : ", client.id, new Date());        
        
        client.on('connectionStatus', function(cb) {
            console.log("connectionStatus received....")
            // client.emit('connectionStatus', { mongoConnected, redisConnected, amqpConnected })
            cb({ mongoConnected, redisConnected, amqpConnected })
        });

        client.conn.on('packet', function (packet) {
            if (packet.type === 'ping') {
                console.log("Ping received......")
            }
        });

        client.on('disconnect', async (reason) => {
            console.log('client Disconnected......,', reason)
        });

        client.on('error', function(error){
            console.log('client error......,', error)
        });
    });    
}
