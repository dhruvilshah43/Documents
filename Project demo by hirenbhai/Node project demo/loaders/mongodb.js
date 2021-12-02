module.exports = {
    connect,
}

const mongod = require('mongodb');

const { SERVER_TYPE } = require("../modules");

function connect() {
    return new Promise(resolve => {
        let { DB_PROTO, DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME } = config;

        if (typeof DB_PROTO == 'undefined' || DB_PROTO == null) console.log("DB_PROTO is missing")
        if (typeof DB_HOST == 'undefined' || DB_HOST == null) console.log("DB_HOST is missing")
        if (typeof DB_PORT == 'undefined' || DB_PORT == null) console.log("DB_PORT is missing")
        if (typeof DB_NAME == 'undefined' || DB_NAME == null) console.log("DB_NAME is missing")

        let connectionString = `${DB_PROTO}://${DB_USERNAME && DB_PASSWORD ? DB_USERNAME + ":" + DB_PASSWORD + "@" : ""}${DB_HOST}:${DB_PORT}/${DB_NAME}`
        if (DB_PROTO && DB_PROTO == "mongodb+srv") {
            connectionString = `${DB_PROTO}://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`
        }

        let MongoClient = mongod.MongoClient;
        MongoID = mongod.ObjectID;
        MongoClient.connect(connectionString, { useUnifiedTopology: true, useNewUrlParser: true })
            .then(function (dClient) {
                db = dClient.db(DB_NAME);
                mongoConnected = true;
                console.log("MongoDB connected successfully ");

                if (SERVER_TYPE == 'SOCKET') {
                    initDefaultEntry();
                }
                resolve();
            })
            .catch(function (err) {
                console.log('mongodb::Error: ', err);
            })
    });
}

async function initDefaultEntry() {
    setInterval(function () { dashboardClass.autoRemoveTable() }, 5 * 60 * 1000); // 5 min
}