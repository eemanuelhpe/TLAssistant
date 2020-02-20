const mongo = require('mongodb').MongoClient;

module.exports = {
    createSite:(url, dbName, collectionName)=> {
        let database = null;
        return mongo.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then((db) => {
            database = db;
            let dbo = database.db(dbName);
            return dbo.collection(collectionName).drop();
        }).then((result) => {
            console.log("Collection deleted");
            let dbo = database.db(dbName);
            return dbo.createCollection(collectionName);
        }).catch((err) => {
            console.log("Collection not deleted");
            let dbo = database.db(dbName);
            return dbo.createCollection(collectionName);
        }).then((result) => {
            console.log("Collection " + collectionName + " created, in db " + dbName);
            database.close();
        }).catch((err) => {
            console.log("Collection not created");
            database.close()
        }).catch((err) => {
            console.log("err in closing");
            console.log(err);
        });
    }
};

