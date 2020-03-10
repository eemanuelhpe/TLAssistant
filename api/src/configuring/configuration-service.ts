import {dbUtil} from "../db_utils/db-util";
import {type} from "os";
import {EmailDescriptor} from "../dao/emailDescriptor";
import {DbConst} from "../db_utils/db-const";



function addEmailDescriptor(emailDescriptor:EmailDescriptor) {
    return dbUtil.updateCollection(DbConst.EMAIL_DESCRIPTORS, emailDescriptor);
}

function addTemplate(template) {
    return dbUtil.updateCollection(DbConst.TEMPLATES, template);
}

function getTemplates(){
    return dbUtil.getAllEntriesFromCollection(DbConst.TEMPLATES);
}

function getEmailDescriptor(){
    return dbUtil.getAllEntriesFromCollection(DbConst.EMAIL_DESCRIPTORS);
}

async function getTemplateByIdentifier(identifier) {
   let template =  await dbUtil.getEntriesByIdentifier(DbConst.TEMPLATES,identifier);
   return template;
}

export let configurationService = {
    addEmailDescriptor:addEmailDescriptor,
    addTemplate:addTemplate,
    getTemplates:getTemplates,
    getEmailDescriptor:getEmailDescriptor
};





