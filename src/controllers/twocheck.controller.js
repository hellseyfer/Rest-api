/* const TwoCheck = require('../models/twocheck.model'); */
const TwoCheckInvoice = require('../models/twocheck_invoice.model');
const TwoCheckOrder = require('../models/twocheck_order.model');

const twocheckCtrl = {};

twocheckCtrl.getNotifications = async (req, res) => {
    const notifications = res
    res.json(notifications);
};

twocheckCtrl.postInvoice = async (req, res) => {
    let body = req.body;
    console.log("REQ: ", body);

    const TwoCheckInvoiceData = new TwoCheckInvoice(body);

    try {
        await TwoCheckInvoiceData.save()
        res.json({ status: 'invoice received' });

    } catch (err) {
        console.log(err);
        var error = {};
        error.message = err;
        res.json({ status: err });
    }
};

twocheckCtrl.postOrder = async (req, res) => {

    let body = req.body;
    console.log("REQ: ", body);

    const TwoCheckOrderData = new TwoCheckOrder(body);
    try {
        await TwoCheckOrderData.save();
        res.json({ status: 'order received' });

    } catch (err) {
        console.log(err);
        var error = {};
        error.message = err;
        res.json({ status: err });
    }
};

module.exports = twocheckCtrl;
