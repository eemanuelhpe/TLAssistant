

function createTabEmailHtml(title, data, fields) {
    let str = "";
    str += '<h1>' + title + '</h1>';

    data.data.forEach(item => {
        fields.forEach(fieldLine => {
            str += '<p>';
            fieldLine.forEach(field => {
                let fieldName = getFieldName(field);
                let label = getLabel(field);
                str += '<span style=\"padding-left: 4em\">';
                str += ' ' +  label + ': ' +  getDescendantProp(item, fieldName) + '</span>';

            });
            str += '</p>';
        });
        str += '<hr>';
    });
    return str;
}

function getLabel(field){
    let label = field;
    if (field.includes(':')){
        label = field.substring(field.indexOf(':')+1);
    }
    return capitalizeFirstLetter(label);

}
function getFieldName(field) {
    if (field.includes(':')){
        return field.substring(0,field.indexOf(':'));
    }
    return field;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function createTableEmailHtml(title, data, fields) {
    let str = "";
    str += '<h1>' + title + '</h1>';

    str += '<table style="width:100%">';

    str += '<tr>'
    fields.forEach(field => {
        str += '<th>' + field + '</th>';
    });
    str += '</tr>';

    data.data.forEach(item => {
        str += '<tr>'
        fields.forEach(field => {
            str += '<td>' + getDescendantProp(item, field) + '</td>';

        })
        str += '</tr>'

    });
    str += '</table>';
    return str;
}

function getDescendantProp(item, field) {
    var arr = field.split(".");
    while (arr.length && (item = item[arr.shift()])) ;
    return item;
}


module.exports = {
    createEmailHtmlFromList (listOfData){
        //todo sort by rank, and take style into account
        let finalHtml = "<html><head></head><body  style=\"font-family:Roboto, RobotoDraft, Helvetica, Arial,sans-serif\">";
        listOfData.forEach(value => {
            let subSectionTitle = value.notificationEntry.title;
            let fields = value.notificationEntry.fields;
            finalHtml += createTabEmailHtml(subSectionTitle, value.data, fields);

        });
        finalHtml += "</body></html>";
        return finalHtml;
    }
}

