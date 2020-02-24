var express = require('express');
var router = express.Router();
const dbUtil = require('../db_utils/dbUtil.js')

router.post('/', function(req, res, next) {
    updateEntry('d');
    res.send('alert was added');
});

function updateEntry(entry){
    let condition = "((team%3D%7Bid%3D8003%7D);(defect_type%3D%7Bid%3D%27list_node_defect_type_cpe_incident_ln%27%7D);blocked%3Dfalse;phase%3D%7Bid+IN+%27phase.defect.new%27,%27phase.defect.opened%27,%27o2z59r8vd8z5wfryk2jjmng61%27,%27jq210o9wgzmk4sn3kdj6j0nk3%27%7D;(subtype%3D%27defect%27))"

    let defaultQuery = {
        sharedSpaceId:1001,
        workspaceId:1001,
        fields: ['id','name'],
        orderBy:['id'],
        condition: condition
    }

    let defaultEntry ={
        email:"eemanuel@microfocus.com",
        query:defaultQuery,
        title: "CPE Incidents",
        time:"42 * * * * *",
        style:"table",
        rank: 1
    }

    if (!entry){
        entry = defaultEntry;
    }
    dbUtil.updateCollection('queries',{});
}

module.exports = router;