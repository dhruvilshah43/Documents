let commonClass;
process
    .on('unhandledRejection', (reason, p) => {
        console.error(reason, 'Unhandled Rejection at Promise >> ', new Date(), ' >> ', p);
    }).on('uncaughtException', err => {
        console.error('Uncaught Exception thrown', new Date(), ' >> ', '\n', err);
    });

const { SERVER_TYPE, SERVER_PORT } = require("./modules");


const dbOps = require('./loaders/mongodb');
const rdsOps = require('./loaders/redis');
const amqpOps = require('./loaders/amqp');
Promise.all([
    dbOps.connect(),
    rdsOps.connect(),
    amqpOps.connect(),
]).then(() => {

    console.log("All connections are done....")

    /* configure express app */
    require('./loaders/express')();
    /* socket events & connections are handled here */
    require('./loaders/socket')();

    server.listen(SERVER_PORT, function () {
        console.log(`${SERVER_TYPE} Server listening to the port ${SERVER_PORT}`);
    });
})