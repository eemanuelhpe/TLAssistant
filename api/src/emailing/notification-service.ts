import {emailDesigner} from './email-designer';
import {octaneConnector} from "./octane-connector";
import {dbUtil} from "../db_utils/db-util";
import {DataItem, dataTransformation} from "./data-transfomation";
import util from 'util';
import {emailService} from "./email-service";
import {authenticationService} from "../authintication/authentication-service";
import {Alert} from "../dao/alert";
import {NotificationTemplate} from "../dao/notification-template";
import {NotificationEntity} from "../dao/notification";

var _ = require('lodash');




export let notificationService = {
    sendEmailsToUsers: sendEmailsToUsers
};

async function sendEmailsToUsers() {
    let alerts = await dbUtil.getAllEntriesFromCollection('alerts');
    let templates = await dbUtil.getAllEntriesFromCollection('templates');

    let notificationMap = createNotificationMap(templates,alerts);

    for (let [email, notifications] of notificationMap) {
        createAndSendMail(email, notifications);
    }
}

function createNotificationMap(templates:Array<NotificationTemplate>,alerts:Array<Alert>){
    let notificationMap = new Map();
    let templatesMap = new Map(templates.map(template => [template.identifier, template]));

    alerts.forEach(alert => {
        let entries = notificationMap.get(alert.email);
        if (!entries) {
            entries = [];
            notificationMap.set(alert.email, entries);
        }
        let notification = buildNotification(alert,templatesMap.get(alert.identifier));
        entries.push(notification);
    });
    return notificationMap;

}

function buildNotification(alert:Alert, template:NotificationTemplate){

   // delete template._id;
    let notification:NotificationEntity =  convertTemplateToNotification(template);
    for (let key in notification) {
        for (let replacmentKey in alert.fieldsToFill) {
            if (typeof notification[key]=== 'string'){
                notification[key] = template[key].replace('$$' + replacmentKey + '$$', alert.fieldsToFill[replacmentKey]);
            }
        }
    }
    notification.email = alert.email;
    return notification;
}

function convertTemplateToNotification(template:NotificationTemplate):NotificationEntity{
    let notification: NotificationEntity = new NotificationEntity();
    notification.baseUrl = template.baseUrl;
    notification.sharedSpaceId = template.sharedSpaceId;
    notification.workspaceId = template.workspaceId;
    notification.entity = template.entity;
    notification.query = template.query;
    notification.title = template.title;
    notification.fields = template.fields;
    notification.style = template.style;
    notification.sqlTransformer = template.sqlTransformer;
    notification.sqlCondition = template.sqlCondition;
    notification.type = template.type;
    return notification;
}



async function createAndSendMail(email, notificationEntries) {
    let authData = await authenticationService.getOctaneAuth();
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
        let dataItem:DataItem  = dataTransformation.transformData({notificationEntry: notificationEntries[i], data: resultList[i]});
        contentList.push(dataItem);
    }
    let emailHtml = emailDesigner.createEmailHtmlFromList(contentList);
    await emailService.sendEmail("Today in octane", emailHtml,notificationEntries[0].email,await authenticationService.getSenderEmailDetails());
    return "Email successfully sent";
}

//temp notificationQuery = url
function buildUrl(notificationEntry) {
    return util.format('%s/api/shared_spaces/%s/workspaces/%s/%ss?%s'
        , notificationEntry.baseUrl, notificationEntry.sharedSpaceId, notificationEntry.workspaceId, notificationEntry.entity, notificationEntry.query)

}



