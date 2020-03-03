import exp from "constants";
import logger from "pino";


const mongo = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/';
const dbName = 'tlai_db';

function createNewCollection(collectionName) {
    let database = null;
    return mongo.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then((db) => {
        database = db;
        let dbo = database.db(dbName);
        return dbo.collection(collectionName).drop();
    }).then((result) => {
        logger.info("Collection deleted");
        let dbo = database.db(dbName);
        return dbo.createCollection(collectionName);
    }).catch((err) => {
        logger.error("Collection not deleted");
        let dbo = database.db(dbName);
        return dbo.createCollection(collectionName);
    }).then((result) => {
        logger.info("Collection " + collectionName + " created, in db " + dbName);
        database.close();
    }).catch((err) => {
        logger.error("Collection not created");
        database.close()
    }).catch((err) => {
        logger.error("err in closing");
        logger.error(err);
    });
}

function updateCollection(collectionName, entry) {
    let database = null;
    return mongo.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then((db) => {
        database = db;
        let dbo = database.db(dbName);
        return dbo.collection(collectionName).insertOne(entry);
    }).then((result) => {
        logger.info("1 document inserted");
        database.close();
    }).catch((err) => {
        logger.error("Collection not updated");
        database.close()
    }).catch((err) => {
        logger.error("err in closing updateCollection");
        logger.error(err);
    });
}

function getAllEntriesFromCollection(collectionName) {
    return mongo.connect(url).then((db) => {
        var dbo = db.db("tlai_db");
        return dbo.collection(collectionName).find({}).toArray().then((data) => {
            //if (err) throw err;
            db.close();
            return data;
        }).catch((err) => {
            logger.error("err in closing getAllEntriesFromCollection");
            logger.error(err);
        });
    });
}

//"identifier":{$eq:identifier}
function getEntriesByIdentifier(collectionName, identifier) {
    return mongo.connect(url).then((db) => {
        var dbo = db.db("tlai_db");
        return dbo.collection(collectionName).findOne({"identifier":{$eq:identifier}}).then((data) => {
            //if (err) throw err;
            db.close();
            return data;
        }).catch((err) => {
            db.close();
            logger.error("err in finding identifier");
            logger.error(err);
        }).catch((err) => {
            logger.error("err in closing db");
            logger.error(err);
        });
    });
}

export let dbUtil ={
    updateCollection:updateCollection,
    getAllEntriesFromCollection:getAllEntriesFromCollection,
    getEntriesByIdentifier:getEntriesByIdentifier,
    createNewCollection:createNewCollection
};



