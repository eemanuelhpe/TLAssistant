import {Alert} from "../dao/alert";
import {dbUtil} from "../db_utils/db-util";
import {type} from "os";



function addAlert(alert) {
    return dbUtil.updateCollection('alerts', alert);
}

function addTemplate(template) {
    return dbUtil.updateCollection('templates', template);
}

function getTemplates(){
    return dbUtil.getAllEntriesFromCollection('templates');
}

function getAlerts(){
    return dbUtil.getAllEntriesFromCollection('alerts');
}

async function getTemplateByIdentifier(identifier) {
   let template =  await dbUtil.getEntriesByIdentifier('templates',identifier);
   return template;
}

export let configurationService = {
    addAlert:addAlert,
    addTemplate:addTemplate,
    getTemplates:getTemplates,
    getAlerts:getAlerts
};





