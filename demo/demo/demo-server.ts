import {Alert} from "../../api/src/dao/alert";
import axios from "axios";
import {DemoTemplates} from "./demo-templates";
import {authConfig} from "../privateConfig/authConfig";

let baseAppUrl = 'http://127.0.0.1:9500/app';
//let baseAppUrl = 'http://myd-hvm03959.swinfra.net:9500/app';


//let userEmail = "slin@microfocus.com";
//let userEmail =  "nir.yom-tov@microfocus.com";
let userEmail = "eemanuel@microfocus.com";
let demoUtil;

async function init(){
    demoUtil = new demoUtil(baseAppUrl);
    await authConfig.configure(baseAppUrl);
    await demoUtil.createSiteDemo();
}

async function endToEnd_withoutScheduling() {
    try {
        await init();


        for (let template of DemoTemplates.templates){
            await createNotificationFromTemplate(template,userEmail,{team:'sharon'});
        }

    } catch (e) {
        console.error("error in demo-server", e);
    }

    await demoUtil.sendEmailDemo();
}

async function endToEnd_withScheduling() {
    try {
        await init();

        for (let template of DemoTemplates.templates){
            await demoUtil.createNotificationFromTemplate(template,userEmail,{team:'sharon'});
        }

    } catch (e) {
        console.error("error in demo-server", e);
    }

    await demoUtil.scheduleDemo('0 8 * * *');
}

async function  createNotificationFromTemplate(template:any, email:any, fieldsToFill:any){
    await this.addTemplateDemo(template);
    let alert:Alert = {
        email:email,
        fieldsToFill:fieldsToFill,
        identifier:template.identifier
    };
    await this.addAlertDemo(alert);
}





endToEnd_withoutScheduling().then(r => {});
//endToEnd_withScheduling().then(r => {});

