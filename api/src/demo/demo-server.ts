import {Alert} from "../dao/alert";
import axios from "axios";
import {octaneNotificationTask} from "../emailing/octane-notification-task";
import {createSite} from "../db_setup/create-site";
import {configurationService} from "../configuring/configuration-service";
import {Notification} from "../dao/notification";
import {DemoTemplates} from "./demo-templates";

async function endToEnd_withoutScheduling() {
    try {

        //let userEmail = "slin@microfocus.com";
        //let userEmail =  "nir.yom-tov@microfocus.com";
        let userEmail = "eemanuel@microfocus.com";

        await createSite.createNewCollection('mongodb://localhost:27017/', "tlai_db", "notification_list");
        await createSite.createNewCollection('mongodb://localhost:27017/', "tlai_db", "templates");

        for (let template of DemoTemplates.templates){
            await createNotificationFromTemplate(template,userEmail,{team:'sharon'});
        }

    } catch (e) {
        console.error("error in demo-server", e);
    }

    await sendEmailDemo();
}

async function createNotificationFromTemplate(template:any, email:any, fieldsToFill:any){
    await addTemplateDemo(template);
    let alert:Alert = {
        email:email,
        fieldsToFill:fieldsToFill,
        identifier:template.identifier
    };
    await addAlertDemo(alert);
}
let baseAppUrl = 'http://127.0.0.1:9500/app';

function addAlertDemo(data){
    return axios.post(baseAppUrl + '/alert', data)
        .then((res) => {
            console.log(res.data);
        })
        .catch((error) => {
            console.error('got the following error massage when trying add alert: ' +error.message)
        })
}

 function addTemplateDemo(data){
    return axios.post(baseAppUrl + '/notification-template', data)
        .then((res) => {
            console.log(res.data);
        })
        .catch((error) => {
            console.error('got the following error massage when trying add template: ' +error.message)
        })
}

function sendEmailDemo(){
    return axios.post(baseAppUrl + '/send-email')
        .then((res) => {
            console.log(res.data);
        })
        .catch((error) => {
            console.error('got the following error massage when trying add template: ' +error.message)
        })
}

endToEnd_withoutScheduling().then(r => {});
