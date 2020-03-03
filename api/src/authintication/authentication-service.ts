import {dbUtil} from "../db_utils/db-util";

const sender_emails = 'sender_emails';
const octane_auth = 'octane_auth';

async function getSenderEmailDetails() {
    let emailObject = await dbUtil.getAllEntriesFromCollection(sender_emails);
    return emailObject[0];
}

async function getOctaneAuth() {
    let authObject = await dbUtil.getAllEntriesFromCollection(octane_auth);
    return authObject[0];
}

async function setSenderEmailDetails(emailObject) {
    await dbUtil.createNewCollection(sender_emails);
    await dbUtil.updateCollection(sender_emails, emailObject);
}

async function setOctaneAuth(authObject) {
    await dbUtil.createNewCollection(octane_auth);
    await dbUtil.updateCollection(octane_auth, authObject);
}


export let authenticationService = {
    getOctaneAuth: getOctaneAuth,
    getSenderEmailDetails: getSenderEmailDetails,
    setSenderEmailDetails: setSenderEmailDetails,
    setOctaneAuth: setOctaneAuth
};


