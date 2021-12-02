function connect(){
    return new Promise(resolve => {
        let { RABBITMQ_HOST, RABBITMQ_PORT, RABBITMQ_LOGIN, RABBITMQ_PASSWORD, RABBITMQ_VHOST } = process.env
 
        var connection = amqp.createConnection({
            host: RABBITMQ_HOST,
            port: RABBITMQ_PORT,
            login: RABBITMQ_LOGIN,
            password: RABBITMQ_PASSWORD,
            vhost: RABBITMQ_VHOST
        });
        
        connection.on('error', function(error) {
            console.error("Redis Client error : ",error);
        });
        
        connection.on('ready', function () {
            console.log("RabbitMQ connected successfully");
            amqpConnected = true;
            resolve();
        });
    })   
}

module.exports = {
    connect
}