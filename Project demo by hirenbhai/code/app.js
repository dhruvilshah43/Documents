process
    .on('unhandledRejection', (reason, p) => {
        console.error(reason, 'Unhandled Rejection at Promise', p);
    }).on('uncaughtException', err => {
        console.error('Uncaught Exception thrown', '\n', err);
    });

require("./modules")();

/* configure express app */
require('./loaders/express')();

/* socket events & connections are handled here */
require('./loaders/socket')();

let port = process.env.PORT;


server.listen(port, function() {
    console.log("Server listening to the port ", port, new Date());
});

Promise.all([
    dbOps.connect(),
    rdsOps.connect(),
    amqpOps.connect()
]).then(function(values) {
    console.log("All connections are done....")
});
