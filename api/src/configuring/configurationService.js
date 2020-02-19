const dbUtil = require('../db_utils/dbUtil.js')

function addAlert(notificationEntry){
  return   dbUtil.updateCollection('notification_list',notificationEntry);
}

module.exports = {addAlert};