import {NotificationEntry} from "../dao/NotificationEntry";
import alasql from "alasql";

const util = require('util');
const fs = require('fs');
const path = require('path');

export let emailDesigner = {
    createEmailHtmlFromList: createEmailHtmlFromList
};

interface DataItem {
    data: any,
    notificationEntry: NotificationEntry
}

function createEmailHtmlFromList(listOfData: Array<DataItem>) {
    //todo sort by rank, and take style into account
    let htmlContent = '';

    listOfData.forEach(dataItem => {
        if (dataItem.notificationEntry.type === 'single') {
            htmlContent += createSingleValueHtml(dataItem);
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

function createSingleValueHtml(dataItem: DataItem) {
    let flatData:Array<any> = convertToFlatTable(dataItem);
    if (dataItem.notificationEntry.sqlTransformer){
        flatData = alasql(dataItem.notificationEntry.sqlTransformer,[flatData]);
    }
    let text:string = dataItem.notificationEntry.title;
    for (let key in flatData[0]) {
        text = text.replace('##' + key + '##', flatData[0][key]);
    }
    return '<p>'+text+'</p>';

}

function createLink(id, notificationEntry) {
    return util.format('%s/ui/?p=%s/%s#/entity-navigation?entityType=%s&id=%s',
        notificationEntry.baseUrl, notificationEntry.sharedSpaceId, notificationEntry.workspaceId, notificationEntry.entity, id);
}

function getFinaHtml(htmlBody) {
    var jsonPath = path.join(__dirname, '.', 'template.html');
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
    let flatData = convertToFlatTable(dataItem);
    flatData.forEach(item => {
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

//convert nested objects to flat table
function convertToFlatTable(dataItem: DataItem):Array<any> {

    let flatTable:Array<any> =[];
    dataItem.data.data.forEach(item => {
        let entry = {};
        dataItem.notificationEntry.fields.forEach(fieldLine => {
            fieldLine.forEach(field => {
                let fieldName:string = getFieldName(field);
                let fieldValue = getNestedProp(item, fieldName);
                entry[fieldName] = fieldValue;
            });
        });
        flatTable.push(entry);
    });
    return flatTable;
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

function getNestedProp(item, field) {
    var arr = field.split(".");
    while (arr.length && (item = item[arr.shift()])) ;
    return item;
}


