import {emailDesigner} from './emailDesigner';
import {octaneConnector} from "./octaneConnector";
import {dbUtil} from "../db_utils/dbUtil";
import {config} from "../../privateConfig/config";
import util from 'util';

var _ = require('lodash');

export let octaneNotificationTask = {
    sendEmailsToUsers: sendEmailsToUsers
};

async function sendEmailsToUsers() {
    let notification_list = await dbUtil.getAllEntriesFromCollection('notification_list');
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

async function createAndSentMail(email, notificationEntries) {
    let authData = config.octaneAuth;
    let promiseArray = [];

    notificationEntries.forEach(entry => {
        let url = buildUrl(entry);
        promiseArray.push(octaneConnector.getContent(authData, url));
    });

    let resultList = await Promise.all(promiseArray);

    if (resultList.length !== notificationEntries.length) {
        throw 'length of the two lists should be identical';
    }

    let contentList = []
    for (let i = 0; i < resultList.length; i++) {
        contentList.push({notificationEntry: notificationEntries[i], data: resultList[i]});
    }
    let emailHtml = emailDesigner.createEmailHtmlFromList(contentList);
    await emailService.sendEmail("today in octane", emailHtml,notificationEntries[0].email,config.emailAuth);
    return "Email successfully sent";
}

//temp notificationQuery = url
function buildUrl(notificationEntry) {
    return util.format('%s/api/shared_spaces/%s/workspaces/%s/%ss?%s'
        , notificationEntry.baseUrl, notificationEntry.sharedSpaceId, notificationEntry.workspaceId, notificationEntry.entity, notificationEntry.query)

}



