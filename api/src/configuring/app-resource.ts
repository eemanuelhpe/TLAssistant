import {notificationService} from "../emailing/notification-service";

var express = require('express');
import {configurationService} from "../configuring/configuration-service";
import schedule from "node-schedule";
import {dbUtil} from "../db_utils/db-util";
import {authenticationService} from "../authintication/authentication-service";

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
    await dbUtil.createNewCollection("notification_list");
    await dbUtil.createNewCollection( "templates");
    res.send('old site deleted and new site was created');
});

router.post('/schedule', async (req, res, next) =>{
    schedule.scheduleJob((req.body.cronString), notificationService.sendEmailsToUsers);
    res.send('you scheduled email sending with the following parameter ' + req.body.cronString);
});

router.post('/email-details', async (req, res, next) =>{
    await authenticationService.setSenderEmailDetails(req.body);
    res.send('you added email details with the following parameter ' + req.body);
});

router.post('/octane-auth', async (req, res, next) =>{
    await authenticationService.setOctaneAuth(req.body);
    res.send('you added octane auth with the following parameter ' + req.body);
});



module.exports = router;