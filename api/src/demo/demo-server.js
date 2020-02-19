const octaneNotificationTask = require('../emailing/octaneNotificationTask');
const createSite = require('../db_setup/createSite');
const configurationService = require('../configuring/configurationService');


async function endToEnd_withoutScheduling() {
    try {
        await createSite('mongodb://localhost:27017/', "tlai_db", "notification_list");
        let defaultQuery = 'https://center.almoctane.com/api/shared_spaces/1001/workspaces/1002/work_items?fields=parent,rank,followed_by_me,has_attachments,story_points,name,severity,owner,release,id,phase,blocked,author,tasks_number,detected_in_release,subtype,milestone&limit=30&offset=0&order_by=rank,id&query=%22((team%3D%7Bid%3D8003%7D);(defect_type%3D%7Bid%3D%27list_node_defect_type_cpe_incident_ln%27%7D);blocked%3Dfalse;phase%3D%7Bid+IN+%27phase.defect.new%27,%27phase.defect.opened%27,%27o2z59r8vd8z5wfryk2jjmng61%27,%27jq210o9wgzmk4sn3kdj6j0nk3%27%7D;(subtype%3D%27defect%27))%22';

        let entry = {
            _id: 130,
            email: "eemanuel@microfocus.com",
            query: defaultQuery,
            title: "CPE Incidents",
            fields: ['id','name', 'severity','owner.id', 'owner.name'],
            time: "42 * * * * *",
            style: "table",
            rank: 1
        }

        await configurationService.addAlert(entry);
    } catch (e) {
        console.error("error in demo-server", e);
    }

    octaneNotificationTask.sendEmailsToUsers();
}

endToEnd_withoutScheduling();
