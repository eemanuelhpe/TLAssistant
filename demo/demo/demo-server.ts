import {Alert, EmailDescriptor} from "../../api/src/dao/emailDescriptor";
import axios from "axios";
import {DemoTemplates} from "./demo-templates";
import {authConfig} from "../privateConfig/authConfig";
import {NotificationTemplate} from "../../api/src/dao/notification-template";
import {DemoUtil} from "./demo-util";

let baseAppUrl = 'http://127.0.0.1:9500/app';
//let baseAppUrl = 'http://myd-hvm03959.swinfra.net:9500/app';


//let userEmail = "slin@microfocus.com";
//let userEmail =  "nir.yom-tov@microfocus.com";
let userEmail = "eemanuel@microfocus.com";
let demoUtil:DemoUtil;

async function init() {
    demoUtil = new DemoUtil(baseAppUrl);
    await authConfig.configure(baseAppUrl);
    await demoUtil.createSiteDemo();
}

async function endToEnd_withoutScheduling() {
    try {
        await init();
        await createNotificationFromTemplates(DemoTemplates.templates, userEmail, {team: 'sharon'});


    } catch (e) {
        console.error("error in demo-server", e);
    }

    await demoUtil.sendEmailDemo();
}

async function endToEnd_withScheduling() {
    try {
        await init();

        for (let template of DemoTemplates.templates) {
            await this.createNotificationFromTemplate(template, userEmail, {team: 'sharon'});
        }

    } catch (e) {
        console.error("error in demo-server", e);
    }

    await demoUtil.scheduleDemo('0 8 * * *');
}

async function createNotificationFromTemplates(templates: Array<NotificationTemplate>, email: any, fieldsToFill: any) {
    let alerts: Array<Alert> = [];
     templates.forEach(template => {
         demoUtil.addTemplateDemo(template);
        alerts.push({templateIdentifier: template.identifier, fieldsToFill: fieldsToFill})
    });

    let emailDescriptor: EmailDescriptor = {
        email: email,
        alerts: alerts
    };
    await demoUtil.addEmailDescriptorDemo(emailDescriptor);
}


endToEnd_withoutScheduling().then(r => {
});
//endToEnd_withScheduling().then(r => {});

