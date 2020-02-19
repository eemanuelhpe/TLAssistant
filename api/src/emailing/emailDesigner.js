


function createEmailHtml(title,data,fields){
    let str = "";
    str += '<h1>' + title + '</h1>';

    str +=  '<table style="width:100%">';

    str += '<tr>'
    fields.forEach(field =>{
        str += '<th>' + field +'</th>';
    });
    str += '</tr>';

    data.data.forEach(item =>{
        str += '<tr>'
        fields.forEach(field => {
            str += '<td>' + getDescendantProp(item,field) + '</td>';

        })
        str += '</tr>'

    });
    return str;
}

function getDescendantProp(item, field) {
    var arr = field.split(".");
    while(arr.length && (item = item[arr.shift()]));
    return item;
}




function createEmailHtmlFromList(listOfData){
    //todo sort by rank, and take style into account
    let finalHtml = "<html><head></head><body>";
    listOfData.forEach(value =>{
        let subSectionTitle = value.notificationEntry.title;
        let fields = value.notificationEntry.fields;
        finalHtml += createEmailHtml(subSectionTitle,value.data,fields);

    });
    finalHtml += "</body></html>";
    return finalHtml;
}

module.exports = {createEmailHtml,createEmailHtmlFromList};
