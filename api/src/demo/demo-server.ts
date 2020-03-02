import {Alert} from "../dao/alert";
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

    await octaneNotificationTask.sendEmailsToUsers();
}

async function createNotificationFromTemplate(template:any, email:any, fieldsToFill:any){
    await configurationService.addTemplate(template);
    let alert:Alert = {
        email:email,
        fieldsToFill:fieldsToFill,
        identifier:template.identifier
    };
    await configurationService.createNotificationFromTemplate(alert);
}

endToEnd_withoutScheduling().then(r => {});
