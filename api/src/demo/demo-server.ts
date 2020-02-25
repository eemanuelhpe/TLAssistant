import {AlertEntry} from "../dao/AlertEntry";
import {octaneNotificationTask} from "../emailing/octaneNotificationTask";
import {createSite} from "../db_setup/createSite";
import {configurationService} from "../configuring/configurationService";
import {NotificationEntry} from "../dao/NotificationEntry";
import {DemoTemplates} from "./demo-templates";

async function endToEnd_withoutScheduling() {
    try {

        let userEmail = "eemanuel@microfocus.com";
        //let userEmail = "eemanuel@microfocus.com";

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

async function createNotificationFromTemplate(template, email, fieldsToFill){
    await configurationService.addTemplate(template);
    let alert:AlertEntry = {
        email:email,
        fieldsToFill:fieldsToFill,
        identifier:template.identifier
    };
    await configurationService.createNotificationFromTemplate(alert);
}

endToEnd_withoutScheduling().then(r => {});
