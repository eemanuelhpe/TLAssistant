import alasql from "alasql";
import {Notification} from "../dao/notification";


export interface DataItem {
    data: any,
    notificationEntry: Notification
}

function transformData(dataItem: DataItem):DataItem {
    if (dataItem.notificationEntry.type === 'multi'){
        return transformDataForMultiEntryType(dataItem);
    }
    else if (dataItem.notificationEntry.type === 'single'){
        return  transformDataForOneEntryType(dataItem);
    }
    return dataItem;
}

function transformDataForOneEntryType(dataItem: DataItem) {
    dataItem.data = convertToFlatTable(dataItem);
    dataItem.data = sqlTransformation(dataItem);
    dataItem.notificationEntry.title = transformText(dataItem);
    return dataItem;
}

function transformDataForMultiEntryType(dataItem: DataItem) :any{
    dataItem.data = convertToFlatTable(dataItem);
    return dataItem;
}



function sqlTransformation(dataItem: DataItem) :any{
    if (dataItem.notificationEntry.sqlTransformer){
        return alasql(dataItem.notificationEntry.sqlTransformer,[dataItem.data]);
    }
    return dataItem.data;
}

function transformText(dataItem: DataItem):any {
    var text =  dataItem.notificationEntry.title;
    for (let key in dataItem.data[0]) {
        text = text.replace('##' + key + '##', dataItem.data[0][key]);
    }
    return text;
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

function getNestedProp(item, field) {
    var arr = field.split(".");
    while (arr.length && (item = item[arr.shift()])) ;
    return item;
}

function getFieldName(field) {
    if (field.includes(':')) {
        return field.substring(0, field.indexOf(':'));
    }
    return field;
}

export let dataTransformation = {
    transformData: transformData
};




