function connect() {
    return new Promise(resolve => {
        let {
            DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME
        } = process.env;

        let connectionString = `mongodb://${DB_USER && DB_PASS ? DB_USER + ":" + DB_PASS + "@" : ""}${DB_HOST}:${DB_PORT}`
        
        dbClient = mongoose.createConnection(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            poolSize: 50,
        });
        
        dbClient.on("error", (error) => {
            console.error("Mongoose Client error : ", error);
        });
        
        dbClient.once("open", function() {
            console.log("MongoDB connected successfully ");
            db = dbClient.useDb(DB_NAME)
            mongoConnected = true;
            resolve();
        });
    });
}


module.exports = {
    connect
}