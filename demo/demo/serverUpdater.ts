import {Alert} from "../../api/src/dao/alert";
import axios from "axios";
import {DemoTemplates} from "./demo-templates";
import {authConfig} from "../privateConfig/authConfig";

let baseAppUrl = 'http://127.0.0.1:9500/app';
//let baseAppUrl = 'http://myd-hvm03959.swinfra.net:9500/app';


//let userEmail = "slin@microfocus.com";
//let userEmail =  "nir.yom-tov@microfocus.com";
//let userEmail = "eemanuel@microfocus.com";


let demoUtil;

async function init(){
    demoUtil = new demoUtil(baseAppUrl);
}

async function updateAlert() {
    try {
        await init();
        let alert:Alert = {
            email:"userEmail",
            fieldsToFill:"fieldsToFill",
            identifier:"template.identifier"
        };
        await this.addAlertDemo(alert);

    } catch (e) {
        console.error("error in demo-server", e);
    }
    await demoUtil.sendEmailDemo();
}

async function scheduleDemo() {
    await demoUtil.scheduleDemo('0 8 * * *');
}





updateAlert().then(r => {});
//endToEnd_withScheduling().then(r => {});

