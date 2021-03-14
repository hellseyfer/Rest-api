/* const TwoCheck = require('../models/twocheck.model'); */
const TwoCheckInvoice = require('../models/twocheck_invoice.model');
const TwoCheckOrder = require('../models/twocheck_order.model');

const twocheckCtrl = {};

twocheckCtrl.getNotifications = async (req, res) => {
    const notifications = res
    res.json(notifications);
};

twocheckCtrl.postInvoice = async (req, res) => {
    let body = req.params;
    console.log("REQ: ", body);

    const TwoCheckInvoiceData = new TwoCheckInvoice(body);

    try {
        await TwoCheckInvoiceData.save()
        console.log('promise all');
            res.json({
                'response': TwoCheckInvoiceData
            });
            res.send('invoice received');

    } catch (err) {
        console.log(err);
        var error = {};
        error.message = err;
        error.status = 27017;
    }
};

twocheckCtrl.postOrder = async (req, res) => {

    let body = req.params;
    console.log("REQ: ", body);

    const TwoCheckOrderData = new TwoCheckOrder(body);
    try {
        await TwoCheckOrderData.save();
        console.log('promise all');
            res.json({
                'response': TwoCheckOrderData
            });
            res.send('Order received');

    } catch (err) {
        console.log(err);
        var error = {};
        error.message = err;
        error.status = 27017;
    }
};

module.exports = twocheckCtrl;
