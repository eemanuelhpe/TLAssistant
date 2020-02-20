const dbUtil = require('../db_utils/dbUtil.js')
module.exports = {
    addAlert(notificationEntry) {
        return dbUtil.updateCollection('notification_list', notificationEntry);
    }
}


