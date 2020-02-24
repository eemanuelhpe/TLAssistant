import {AlertEntry} from "../dao/AlertEntry";
import {octaneNotificationTask} from "../emailing/octaneNotificationTask";
import {createSite} from "../db_setup/createSite";
import {configurationService} from "../configuring/configurationService";
import {NotificationEntry} from "../dao/NotificationEntry";
import {Templates} from "./ Templates";

async function endToEnd_withoutScheduling() {
    try {

        let userEmail = "eemanuel@microfocus.com";
        //let userEmail = "eemanuel@microfocus.com";

        await createSite.createNewCollection('mongodb://localhost:27017/', "tlai_db", "notification_list");
        await createSite.createNewCollection('mongodb://localhost:27017/', "tlai_db", "templates");

        for (let template of Templates.templates){
            await configurationService.addTemplate(template);
            template.identifier = '';
            let alert:AlertEntry = {
                email:userEmail,
                fieldsToFill:{},
                identifier:template.identifier
            };
            await configurationService.createNotificationFromTemplate(alert);
        }

    } catch (e) {
        console.error("error in demo-server", e);
    }

    await octaneNotificationTask.sendEmailsToUsers();
}

endToEnd_withoutScheduling().then(r => {});
