module.exports = {
    connect
}

const redis = require("redis")

function connect() {
    return new Promise(resolve => {

        let { REDIS_HOST, REDIS_AUTH, REDIS_DB } = config;

        if (typeof REDIS_HOST == 'undefined' || REDIS_HOST == null) console.log("REDIS_HOST is missing")
        if (typeof REDIS_AUTH == 'undefined' || REDIS_AUTH == null) console.log("REDIS_AUTH is missing")
        if (typeof REDIS_DB == 'undefined' || REDIS_DB == null) console.log("REDIS_DB is missing")

        rClient = redis.createClient({
            host: REDIS_HOST,
            password: REDIS_AUTH,
            db: REDIS_DB
        });

        rClient.on("error", function (error) {
            console.error("Redis Client error : ", error);
        });

        rClient.on("ready", function () {
            console.log("Redis connected successfully");
            redisConnected = true;
            resolve();
        });
    })
}