import exp from "constants";

const mongo = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/';
const dbName = 'tlai_db';


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
        console.log("1 document inserted");
        database.close();
    }).catch((err) => {
        console.log("Collection not updated");
        database.close()
    }).catch((err) => {
        console.log("err in closing updateCollection");
        console.log(err);
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
            console.log("err in closing getAllEntriesFromCollection");
            console.log(err);
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
            console.log("err in finding identifier");
            console.log(err);
        }).catch((err) => {
            console.log("err in closing db");
            console.log(err);
        });
    });
}

export let dbUtil ={
    updateCollection:updateCollection,
    getAllEntriesFromCollection:getAllEntriesFromCollection,
    getEntriesByIdentifier:getEntriesByIdentifier
};



