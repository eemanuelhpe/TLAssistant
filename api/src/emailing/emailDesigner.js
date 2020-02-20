const util = require('util');
const fs = require('fs');
const path = require('path');




module.exports = {
    createEmailHtmlFromList(listOfData) {
        //todo sort by rank, and take style into account
        let htmlContent = '';
        listOfData.forEach(value => {
            let subSectionTitle = value.notificationEntry.title;
            let fields = value.notificationEntry.fields;
            htmlContent += createTabEmailHtml(value.notificationEntry, value.data);

        });

        return getFinaHtml(htmlContent);
    }
};

function createLink(id, notificationEntry) {
    return util.format('%s/ui/?p=%s/%s#/entity-navigation?entityType=%s&id=%s',
        notificationEntry.baseUrl, notificationEntry.sharedSpaceId, notificationEntry.workspaceId, notificationEntry.entity, id);
}

function getFinaHtml(htmlBody) {
    var jsonPath = path.join(__dirname, '.', 'template.html');
    let data = fs.readFileSync(jsonPath, 'utf8');
    return data.replace(' <!-- octane content -->',htmlBody);
}


function createTabEmailHtml(notificationEntry, data) {
    let str = "";
    str += '<h3 style=\"color:#5558af \">' + notificationEntry.title + '</h3>';
    data.data.forEach(item => {
        str += '<p style=\"line-height:150%\" >';
        notificationEntry.fields.forEach(fieldLine => {
            let counter = 0;
            fieldLine.forEach(field => {
                let fieldName = getFieldName(field);
                let label = getLabel(field);
                if (counter >0){
                    str += '&#160;&#160;&#160';
                }
                if (label && label.length > 0) {
                    str += '<b>' + label + ':</b>  ';
                }
                if (fieldName === 'id') {
                    let link = createLink(item['id'], notificationEntry)
                    str += '<a href=\"' + link + '\">' + item.id + '</a>';
                } else {
                    str += getDotedProp(item, fieldName);
                }
                counter++;

            });
            str += '<br>';
        });
        str += '</p>';
    });
    str += '<hr>';
    str += '</div>'
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

function createTableEmailHtml(title, data, fields) {
    let str = "";
    str += '<h3>' + title + '</h3>';

    str += '<table style="width:100%">';

    str += '<tr>'
    fields.forEach(field => {
        str += '<th>' + field + '</th>';
    });
    str += '</tr>';

    data.data.forEach(item => {
        str += '<tr>'
        fields.forEach(field => {
            str += '<td>' + getDotedProp(item, field) + '</td>';

        })
        str += '</tr>'

    });
    str += '</table>';
    return str;
}

function getDotedProp(item, field) {
    var arr = field.split(".");
    while (arr.length && (item = item[arr.shift()])) ;
    return item;
}


