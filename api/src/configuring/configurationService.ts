import {AlertEntry} from "../dao/AlertEntry";
import {dbUtil} from "../db_utils/dbUtil";
import {type} from "os";

function addNotification(notificationEntry) {
    return dbUtil.updateCollection('notification_list', notificationEntry);
}

function addTemplate(template) {
    return dbUtil.updateCollection('templates', template);
}

async function createNotificationFromTemplate(alertEntry: AlertEntry) {
    let template:any = await getTemplateByIdentifier(alertEntry.identifier);
    let i =90;

    for (let key in template) {
        for (let replacmentKey in alertEntry.fieldsToFill) {
            if (typeof template[key]=== 'string'){
                template[key] = template[key].replace('$$' + replacmentKey + '$$', alertEntry.fieldsToFill[replacmentKey]);
            }
        }
    }
    template.email = alertEntry.email;
    delete template._id;
    await this.addNotification(template);
}

async function getTemplateByIdentifier(identifier) {
   let template =  await dbUtil.getEntriesByIdentifier('templates',identifier);
   return template;
}

export let configurationService = {
    addNotification:addNotification,
    addTemplate:addTemplate,
    createNotificationFromTemplate:createNotificationFromTemplate
};





