import {NotificationTemplate} from "../dao/NotificationTemplate";
import alasql from "alasql";



let defaultQuery1 = 'fields=parent,rank,followed_by_me,has_attachments,story_points,name,severity,owner,release,id,phase,blocked,author,tasks_number,detected_in_release,subtype,milestone&limit=30&offset=0&order_by=rank,id&query=%22((team%3D%7Bid%3D8003%7D);(defect_type%3D%7Bid%3D%27list_node_defect_type_cpe_incident_ln%27%7D);blocked%3Dfalse;phase%3D%7Bid+IN+%27phase.defect.new%27,%27phase.defect.opened%27,%27o2z59r8vd8z5wfryk2jjmng61%27,%27jq210o9wgzmk4sn3kdj6j0nk3%27%7D;(subtype%3D%27defect%27))%22';
let defaultQuery2 = 'fields=parent,rank,followed_by_me,has_attachments,story_points,name,severity,owner,release,id,phase,blocked,author,tasks_number,detected_in_release,subtype,milestone&limit=111&offset=0&order_by=-severity,id&query=%22((team%3D%7Bid%3D8003%7D);blocked%3Dfalse;phase%3D%7Bid+IN+%27phase.defect.new%27,%27phase.defect.opened%27%7D;(release%3D%7B%5Bcurrent_release%5D%7D);severity%3D%7Bid+IN+%27list_node.severity.high%27,%27list_node.severity.urgent%27%7D;(subtype%3D%27defect%27))%22';
let defaultQuery3 = 'fields=parent,rank,demo_udf,followed_by_me,has_attachments,story_points,name,owner,release,id,phase,blocked,author,tasks_number,detected_in_release,subtype,milestone,is_in_filter,limit_line&limit=30&offset=0&order_by=rank,id&query=%22((team%3D%7Bid%3D8003%7D);(release%3D%7B%5Bcurrent_release%5D%7D);(milestone%3D%7Bid%3D60001%7D);(subtype%3D%27feature%27))%22';

let oneLineQuery = 'fields=end_date,id,is_default&limit=111&offset=0&order_by=id';
let sql = 'SELECT FLOOR( DATEDIFF(Day, DATE(end_date),now())) as days  FROM ?  WHERE is_default = true';

let templatesEntries: Array<NotificationTemplate> = [

    {
        identifier: 'incidents',
        baseUrl: 'https://center.almoctane.com',
        sharedSpaceId: 1001,
        workspaceId: 1002,
        entity: 'work_item',
        query: defaultQuery1,
        title: "CPE Incidents for $$team$$",
        fields: [['id:'], ['name:'], ['severity.name:severity', 'owner.name:owner', 'phase.name:phase']],
        style: "table",
        type: 'multi'
    },

    {
        identifier: 'cd_defects',
        baseUrl: 'https://center.almoctane.com',
        sharedSpaceId: 1001,
        workspaceId: 1002,
        entity: 'work_item',
        query: defaultQuery2,
        title: "C/H Defects – Default Release",
        fields: [['id:'], ['name:'], ['severity.name:severity', 'owner.name:owner', 'phase.name:phase']],
        style: "table",
        type: 'multi'

    },

    {
        identifier: 'features',
        baseUrl: 'https://center.almoctane.com',
        sharedSpaceId: 1001,
        workspaceId: 1002,
        entity: 'work_item',
        query: defaultQuery3,
        title: "Features – Relevant Push (Milestone) (Owner, Phase, Demo)",
        fields: [['id:'], ['name:'], ['owner.name:owner', 'phase.name:phase', 'demo']],
        style: "table",
        type: 'multi'

    },
    {
        identifier: 'days_to_release_end',
        baseUrl: 'https://center.almoctane.com',
        sharedSpaceId: 1001,
        workspaceId: 1002,
        entity: 'release',
        query: oneLineQuery,
        title: "Left over: ##days## days",
        sqlTransformer: sql,
        fields: [['id', 'end_date', 'is_default']],
        style: "table",
        type: 'single'
    }
];



export let DemoTemplates = {
    templates: templatesEntries
};


