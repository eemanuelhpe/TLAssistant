import {octaneNotificationTask} from "../emailing/octane-notification-task";

var express = require('express');
import {configurationService} from "../configuring/configuration-service";
var router = express.Router();

router.post('/alert', async (req, res, next) => {
    await configurationService.createNotificationFromTemplate(req.body);
    res.send('alert was added');
});

router.post('/notification-template', async (req, res, next) =>{
    await configurationService.addTemplate(req.body);
    res.send('notification was added');
});

router.post('/send-email', async (req, res, next) =>{
    await octaneNotificationTask.sendEmailsToUsers()
    res.send('notification was added');
});



module.exports = router;