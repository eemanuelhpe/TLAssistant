import {notificationService} from "../emailing/notification-service";

var express = require('express');
import {configurationService} from "../configuring/configuration-service";
import {createSite} from "../db_setup/create-site";
import schedule from "node-schedule";

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
    await notificationService.sendEmailsToUsers()
    res.send('notification was added');
});

router.post('/create-site', async (req, res, next) =>{
    await createSite.createNewCollection('mongodb://localhost:27017/', "tlai_db", "notification_list");
    await createSite.createNewCollection('mongodb://localhost:27017/', "tlai_db", "templates");
    res.send('old site deleted and new site was created');
});

router.post('/schedule', async (req, res, next) =>{
    schedule.scheduleJob((req.body.cronString), notificationService.sendEmailsToUsers);
    res.send('you scheduled email sending with the following parameter ' + req.body.cronString);
});





module.exports = router;