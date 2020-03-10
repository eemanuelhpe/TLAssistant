import {emailDesigner} from './email-designer';
import {octaneConnector} from "./octane-connector";
import {dbUtil} from "../db_utils/db-util";
import {DataItem, dataTransformation} from "./data-transfomation";
import util from 'util';
import {emailService} from "./email-service";
import {authenticationService} from "../authintication/authentication-service";
import {Alert, EmailDescriptor} from "../dao/emailDescriptor";
import {NotificationTemplate} from "../dao/notification-template";
import {NotificationEntity} from "../dao/notification";
import {DbConst} from "../db_utils/db-const";

var _ = require('lodash');

export let notificationService = {
    sendEmailsToUsers: sendEmailsToUsers
};

async function sendEmailsToUsers() {
    let descriptors: Array<EmailDescriptor> = await dbUtil.getAllEntriesFromCollection(DbConst.EMAIL_DESCRIPTORS);
    let templates = await dbUtil.getAllEntriesFromCollection(DbConst.TEMPLATES);
    let templatesMap:Map<string,NotificationTemplate> = new Map(templates.map(template => [template.identifier, template]));

    descriptors.forEach(descriptor =>{
        let notificationList:Array<NotificationEntity> = [];
        descriptor.alerts.forEach(alert =>{
            notificationList.push(buildNotification(alert,templatesMap.get(alert.templateIdentifier)))
        })

        createAndSendMail(descriptor,notificationList);
    });
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



async function createAndSendMail(descriptor:EmailDescriptor, notificationEntries) {
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
    //await emailService.sendEmail("Today in octane", emailHtml,descriptor.email,await authenticationService.getSenderEmailDetails());
    return "Email successfully sent";
}

//temp notificationQuery = url
function buildUrl(notificationEntry) {
    return util.format('%s/api/shared_spaces/%s/workspaces/%s/%ss?%s'
        , notificationEntry.baseUrl, notificationEntry.sharedSpaceId, notificationEntry.workspaceId, notificationEntry.entity, notificationEntry.query)

}



