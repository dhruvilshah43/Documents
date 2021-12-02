function connect(){
    return new Promise(resolve => {

        let { REDIS_HOST, REDIS_PORT, REDIS_AUTH, REDIS_DB } = process.env;

        rClient = new redis({
            host: REDIS_HOST,
            port: REDIS_PORT,
            password: REDIS_AUTH,
            db: REDIS_DB
        });

        rClient.on("error", function(error) {
            console.error("Redis Client error : ",error);
        });

        rClient.on("ready", function() {
            console.log("Redis connected successfully");
            redisConnected = true;
            resolve();
        });
    })   
}

module.exports = {
    connect
}