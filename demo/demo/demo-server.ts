import {Alert} from "../../api/src/dao/alert";
import axios from "axios";
import {DemoTemplates} from "./demo-templates";
import {authConfig} from "../privateConfig/authConfig";

//let baseAppUrl = 'http://127.0.0.1:9500/app';
let baseAppUrl = 'http://myd-hvm03959.swinfra.net:9500/app';

async function init(){
    await authConfig.configure(baseAppUrl);
    await createSiteDemo();
}

async function endToEnd_withoutScheduling() {
    try {
      await init();

        //let userEmail = "slin@microfocus.com";
        //let userEmail =  "nir.yom-tov@microfocus.com";
        let userEmail = "eemanuel@microfocus.com";
        for (let template of DemoTemplates.templates){
            await createNotificationFromTemplate(template,userEmail,{team:'sharon'});
        }

    } catch (e) {
        console.error("error in demo-server", e);
    }

    await sendEmailDemo();
}


async function endToEnd_withScheduling() {
    try {
        await init();

        //let userEmail = "slin@microfocus.com";
        //let userEmail =  "nir.yom-tov@microfocus.com";
        let userEmail = "eemanuel@microfocus.com";
        for (let template of DemoTemplates.templates){
            await createNotificationFromTemplate(template,userEmail,{team:'sharon'});
        }

    } catch (e) {
        console.error("error in demo-server", e);
    }

    await scheduleDemo('8 16 * * *');
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
            console.error('got the following error massage when trying send mail' + error.message)
        })
}

function createSiteDemo(){
    return axios.post(baseAppUrl + '/create-site')
        .then((res) => {
            console.log(res.data);
        })
        .catch((error) => {
            console.error('got the following error massage when trying to create site: ' +error.message)
        })
}

function scheduleDemo(cronString:string ){
    return axios.post(baseAppUrl + '/schedule',{cronString:cronString})
        .then((res) => {
            console.log(res.data);
        })
        .catch((error) => {
            console.error('got the following error massage when trying to create site: ' +error.message)
        })
}



//endToEnd_withoutScheduling().then(r => {});
endToEnd_withScheduling().then(r => {});

