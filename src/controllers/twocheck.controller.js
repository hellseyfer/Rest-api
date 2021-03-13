/* const TwoCheck = require('../models/twocheck.model'); */

const twocheckCtrl = {};

twocheckCtrl.getNotifications = async (req, res) => {
    const notifications = res
    res.json(notifications);
};


module.exports = twocheckCtrl;
