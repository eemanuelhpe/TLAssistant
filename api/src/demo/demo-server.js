const octaneNotificationTask = require('../emailing/octaneNotificationTask');
const createSite = require('../db_setup/createSite');
const configurationService = require('../configuring/configurationService');
const NotificationEntry = require('../dao/notificationEntry')


async function endToEnd_withoutScheduling() {
    try {
        await createSite('mongodb://localhost:27017/', "tlai_db", "notification_list");
        let defaultQuery1 = 'fields=parent,rank,followed_by_me,has_attachments,story_points,name,severity,owner,release,id,phase,blocked,author,tasks_number,detected_in_release,subtype,milestone&limit=30&offset=0&order_by=rank,id&query=%22((team%3D%7Bid%3D8003%7D);(defect_type%3D%7Bid%3D%27list_node_defect_type_cpe_incident_ln%27%7D);blocked%3Dfalse;phase%3D%7Bid+IN+%27phase.defect.new%27,%27phase.defect.opened%27,%27o2z59r8vd8z5wfryk2jjmng61%27,%27jq210o9wgzmk4sn3kdj6j0nk3%27%7D;(subtype%3D%27defect%27))%22';
        let defaultQuery2 = 'fields=parent,rank,followed_by_me,has_attachments,story_points,name,severity,owner,release,id,phase,blocked,author,tasks_number,detected_in_release,subtype,milestone&limit=111&offset=0&order_by=-severity,id&query=%22((team%3D%7Bid%3D8003%7D);blocked%3Dfalse;phase%3D%7Bid+IN+%27phase.defect.new%27,%27phase.defect.opened%27%7D;(release%3D%7B%5Bcurrent_release%5D%7D);severity%3D%7Bid+IN+%27list_node.severity.high%27,%27list_node.severity.urgent%27%7D;(subtype%3D%27defect%27))%22' ;
        let defaultQuery3 ='fields=parent,rank,demo_udf,followed_by_me,has_attachments,story_points,name,owner,release,id,phase,blocked,author,tasks_number,detected_in_release,subtype,milestone,is_in_filter,limit_line&limit=30&offset=0&order_by=rank,id&query=%22((team%3D%7Bid%3D8003%7D);(release%3D%7B%5Bcurrent_release%5D%7D);(milestone%3D%7Bid%3D60001%7D);(subtype%3D%27feature%27))%22' ;

        let userEmail = "eemanuel@microfocus.com";

        let entry1 = new NotificationEntry();
        entry1.id = 130;
        entry1.email = userEmail;
        entry1.baseUrl='https://center.almoctane.com';
        entry1.sharedSpaceId=1001;
        entry1.workspaceId=1002;
        entry1.entity='work_items';
        entry1.query= defaultQuery1;
        entry1.title= "CPE Incidents";
        entry1.fields= [['id'],['name:'], ['severity.name:severity', 'owner.name:owner','phase.name:phase']];
        entry1.time= "42 * * * * *";
        entry1.style= "table";
        entry1.rank= 1;
t

        let entry2 = {
            _id: 131,
            email: userEmail,
            baseUrl:'https://center.almoctane.com',
            sharedSpaceId:1001,
            workspaceId:1002,
            entity:'work_items',
            query: defaultQuery2,
            title: "C/H Defects – Default Release",
            fields: [['id'],['name:'], ['severity.name:severity', 'owner.name:owner','phase.name:phase']],
            time: "42 * * * * *",
            style: "table",
            rank: 1
        }
        let entry3 = {
            _id: 132,
            email: userEmail,
            baseUrl:'https://center.almoctane.com',
            sharedSpaceId:1001,
            workspaceId:1002,
            entity:'work_items',
            query: defaultQuery3,
            title: "Features – Relevant Push (Milestone) (Owner, Phase, Demo)",
            fields: [['id'],['name'], ['owner.name', 'phase.name']],
            time: "42 * * * * *",
            style: "table",
            rank: 1
        }

        await configurationService.addAlert(entry1);
        await configurationService.addAlert(entry2);
        await configurationService.addAlert(entry3);

    } catch (e) {
        console.error("error in demo-server", e);
    }

    octaneNotificationTask.sendEmailsToUsers();
}

endToEnd_withoutScheduling();
