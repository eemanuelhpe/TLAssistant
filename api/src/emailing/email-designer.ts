import {Notification} from "../dao/notification";
import alasql from "alasql";

const util = require('util');
const fs = require('fs');
const path = require('path');

export let emailDesigner = {
    createEmailHtmlFromList: createEmailHtmlFromList
};

interface DataItem {
    data: any,
    notificationEntry: Notification
}

function createEmailHtmlFromList(listOfData: Array<DataItem>) {
    //todo sort by rank, and take style into account
    let htmlContent = '';

    listOfData.forEach(dataItem => {
        if (dataItem.notificationEntry.type === 'single') {
            let text = dataItem.notificationEntry.title;
            htmlContent += '<h4 style=\"color:#5558af \">'+text+'</h4>';
        }
    });
    //TODO make it mor efficiant
    listOfData.forEach(dataItem => {
        if (dataItem.notificationEntry.type === 'multi') {
            let subSectionTitle = dataItem.notificationEntry.title;
            let fields = dataItem.notificationEntry.fields;
            htmlContent += createSingleSectionHtml(dataItem);
        }
    });

    return getFinaHtml(htmlContent);
}



function createLink(id, notificationEntry) {
    return util.format('%s/ui/?p=%s/%s#/entity-navigation?entityType=%s&id=%s',
        notificationEntry.baseUrl, notificationEntry.sharedSpaceId, notificationEntry.workspaceId, notificationEntry.entity, id);
}

function getFinaHtml(htmlBody) {
    var jsonPath = path.join(__dirname,'..','..','html', 'template.html');
    let data = fs.readFileSync(jsonPath, 'utf8');
    return data.replace(' <!-- octane content -->', htmlBody);
}

function pureHtml() {
    let pure = '' +
        '' +
        '' +
        '' +
        ''
}


function createSingleSectionHtml(dataItem:DataItem) {
    let str = "";
    str += '<h3 style=\"color:#5558af \">' + dataItem.notificationEntry.title + '</h3>';
    dataItem.data.forEach(item => {
        str += createSingleEntityHtml(item, dataItem.notificationEntry);
    });
    str += '<hr>';
    //str += '</div>'
    return str;
}


function createSingleEntityHtml(item, notificationEntry) {
    let str: string = '';
    str += '<p style=\"line-height:150%\" >';
    notificationEntry.fields.forEach(fieldLine => {
        let counter = 0;
        fieldLine.forEach(field => {
            let fieldName = getFieldName(field);
            let label = getLabel(field);
            if (counter > 0) {
                str += '&#160;&#160;&#160';
            }
            if (label && label.length > 0) {
                str += '<b>' + label + ':</b>  ';
            }
            let itemValue = item[fieldName];
            if (fieldName === 'id') {
                let link = createLink(itemValue, notificationEntry)
                str += '<a href=\"' + link + '\">' + itemValue + '</a>';
            } else {
                str += itemValue;
            }
            counter++;
        });
        str += '<br>';
    });
    str += '</p>';
    return str;
}


function getLabel(field) {
    let label = field;
    if (field.includes(':')) {
        label = field.substring(field.indexOf(':') + 1);
    }
    return capitalizeFirstLetter(label);

}

function getFieldName(field) {
    if (field.includes(':')) {
        return field.substring(0, field.indexOf(':'));
    }
    return field;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

