const emailDesigner = require( "./emailDesigner");

const octaneConnector = require('./octaneConnector.js');
const emailService = require('./emailService.js');
const dbUtils = require('../db_utils/dbUtil')
const config = require('../../privateConfig/config')
const util = require('util');

var _ = require('lodash');

module.exports = {

    async sendEmailsToUsers(){
        let notification_list = await dbUtils.getAllEntriesFromCollection('notification_list');
        let emailMap = new Map();
        notification_list.forEach(entry => {
            let entries = emailMap.get(entry.email);
            if (!entries) {
                entries = [];
                emailMap.set(entry.email, entries);
            }
            entries.push(entry);
        });

        for (let [email, entries] of emailMap) {
            createAndSentMail(email, entries);
        }
    }

}



async function createAndSentMail(email, notificationEntries) {
    let authData = config.octaneAuth;
    let promiseArray = [];

    notificationEntries.forEach(entry => {
        let url = buildUrl(entry);
        promiseArray.push(octaneConnector.getContent(authData,url));
    });

    let resultList = await Promise.all(promiseArray);

    if (resultList.length !== notificationEntries.length) {
        throw 'length of the two lists should be identical';
    }

    let contentList = []
    for (let i = 0;i <resultList.length;i++){
      contentList.push({notificationEntry:notificationEntries[i],data:resultList[i]});
    }
    let emailHtml = emailDesigner.createEmailHtmlFromList(contentList);
    await emailService.sendEmail("today in octane", emailHtml,notificationEntries[0].email,config.emailAuth);
    return "Email successfully sent";
}

//temp notificationQuery = url
function buildUrl(notificationEntry){
    return util.format('%s/api/shared_spaces/%s/workspaces/%s/%ss?%s'
        ,notificationEntry.baseUrl,notificationEntry.sharedSpaceId, notificationEntry.workspaceId,notificationEntry.entity,notificationEntry.query )

}



