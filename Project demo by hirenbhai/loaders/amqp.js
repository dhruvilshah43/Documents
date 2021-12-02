module.exports = {
    connect
}

const amqp = require('amqp');

const { SERVER_TYPE, randomStr, RANDOM_STR } = require("../modules");

function connect() {
    return new Promise(resolve => {
        let { RMQ_HOST, RMQ_LOGIN, RMQ_PASSWORD, RMQ_VHOST } = config

        if (typeof RMQ_HOST == 'undefined' || RMQ_HOST == null) console.log("RMQ_HOST is missing")
        if (typeof RMQ_LOGIN == 'undefined' || RMQ_LOGIN == null) console.log("RMQ_LOGIN is missing")
        if (typeof RMQ_PASSWORD == 'undefined' || RMQ_PASSWORD == null) console.log("RMQ_PASSWORD is missing")
        if (typeof RMQ_VHOST == 'undefined' || RMQ_VHOST == null) console.log("RMQ_VHOST is missing")

        rabbitConn = amqp.createConnection({
            host: RMQ_HOST,
            login: RMQ_LOGIN,
            password: RMQ_PASSWORD,
            vhost: RMQ_VHOST
        });

        rabbitConn.on('error', function (error) {
            console.error("RabbitMQ Client error : ", error);
        });

        rabbitConn.on('ready', function () {
            console.log("RabbitMQ connected successfully");

            playExchange = rabbitConn.exchange('pe', { 'type': 'topic' });

            if (SERVER_TYPE == 'SOCKET') {
                createQueues();
            }

            resolve();
        });
    })
}

function createQueues() {
    console.log("Creating queues...")
    rabbitConn.queue(`User_${randomStr}`, function (q) {
        q.bind(playExchange, "single." + RANDOM_STR + ".*");
        q.subscribe(function (message, headers, deliveryInfo, messageObject) {
            // Code here

            if (deliveryInfo.routingKey.indexOf("single.") != -1) {
                let single = deliveryInfo.routingKey.replace('single.' + RANDOM_STR + '.', '');
                let clientObj = io.sockets.connected[single];

                if (clientObj) {
                    let eData = message; // commonClass.encryptData(message);
                    clientObj.emit('res', { data: eData });

                    if (message.en == 'LT') {
                        if (typeof clientObj._ir != 'undefined' && clientObj._ir == 0) {
                            clientObj.leave(message.data.tbid);
                            delete clientObj.tbid;
                            delete clientObj.si;
                            delete clientObj.gt;
                            c('CreateQueues-- LT -->Msg: "socket removed from table"');
                        }

                    }
                }
            }
        });
    });

    rabbitConn.queue(`Room_${randomStr}`, function (q) {
        q.bind(playExchange, 'room.*');
        q.subscribe(function (message, headers, deliveryInfo, messageObject) {
            // Code here

            if (message.en == 'CTJ') {
                if (message.data.jid != null) {
                    jtClass.cancelJobWithJobId(message.data.jid);
                }
                return false;
            }

            let room = deliveryInfo.routingKey.replace('room.', '');
            //room must be exists in routing key.
            if (!room) {
                console.log('CreateQueues::>Error: "room not found!!!"');
                return false;
            }

            let eData = message; // commonClass.encryptData(message);
            io.to(room).emit('res', { data: eData });

            if (message.en == 'LT') {
                let client = io.sockets.connected[message.data.id];

                if (client && typeof client._ir != 'undefined' && client._ir == 0) {
                    client.leave(message.data.tbid);
                    delete client.tbid;
                    delete client.si;
                    delete client.gt;
                    c('CreateQueues-- LT -->>Msg: "socket removed from table"');
                }

            } else if (message.en == 'STNDUP') {
                let client = io.sockets.connected[message.data.id];
                if (client && typeof client._ir != 'undefined' && client._ir == 0) {
                    delete client.si;
                }
            }
        });
    });
}