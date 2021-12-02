var amqp = require('amqp');

let { RABBITMQ_HOST, RABBITMQ_PORT, RABBITMQ_LOGIN, RABBITMQ_PASSWORD, RABBITMQ_VHOST } = process.env
 
var connection = amqp.createConnection({
    host: RABBITMQ_HOST,
    port: RABBITMQ_PORT,
    login: RABBITMQ_LOGIN,
    password: RABBITMQ_PASSWORD,
    vhost: RABBITMQ_VHOST
});
 
connection.on('error', function(e) {
    console.log("Error from amqp: ", e);
});
 
connection.on('ready', function () {
    console.log("RabbitMQ connected successfully");
});