import {Alert, EmailDescriptor} from "../../api/src/dao/emailDescriptor";
import axios from "axios";
import {DemoTemplates} from "./demo-templates";
import {authConfig} from "../privateConfig/authConfig";
import {DemoUtil} from "./demo-util";
import {NotificationTemplate} from "../../api/src/dao/notification-template";

let baseAppUrl = 'http://127.0.0.1:9500/app';

//let userEmail = "slin@microfocus.com";
//let userEmail =  "nir.yom-tov@microfocus.com";
let userEmail = "eemanuel@microfocus.com";


let demoUtil;

async function init(){
    demoUtil = new DemoUtil(baseAppUrl);
    //await authConfig.configure(baseAppUrl);
}

async function updateEmailDescriptor() {
    try {
        let emailDescriptor:EmailDescriptor = {
            email:userEmail,
            alerts:[
                {
                    templateIdentifier:"current_milestone"
                },
                {
                    templateIdentifier:"milestone_dayleft"
                },
                {
                    templateIdentifier:"days_to_release_end"
                },
                {
                    fieldsToFill:{team:'sharon'},
                    templateIdentifier:"incidents"
                },
                {
                    fieldsToFill:{team:'sharon'},
                    templateIdentifier:"cd_defects"
                },
                {
                    fieldsToFill:{team:'sharon'},
                    templateIdentifier:"features"
                },
                {
                    fieldsToFill:{team:'sharon'},
                    templateIdentifier:"current_milestone"
                }
            ]

        };
        await demoUtil.addEmailDescriptorDemo(emailDescriptor);

    } catch (e) {
        console.error("error in demo-server", e);
    }
}

async function scheduleDemo() {
    await demoUtil.scheduleDemo('0 8 * * *');
}


function addOOBTemplate() {
    let alerts: Array<Alert> = [];
    DemoTemplates.templates.forEach(template => {
        demoUtil.addTemplateDemo(template);
    });
}

//addOOBTemplate


init();
//addOOBTemplate();
//updateEmailDescriptor().then(r => {});
//scheduleDemo().then(r => {});
demoUtil.sendEmailDemo();
//endToEnd_withScheduling().then(r => {});

