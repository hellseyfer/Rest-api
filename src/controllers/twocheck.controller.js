/* const TwoCheck = require('../models/twocheck.model'); */

const twocheckCtrl = {};

twocheckCtrl.getNotifications = async (req, res) => {
    const notifications = res
    res.json(notifications);
};

twocheckCtrl.postInvoice = async (req, res) => {
    console.log(req.body);
    const newInvoice = new Object(req.body);

    try {
        await newInvoice.save();
        console.log('promise all');
            res.json({
                'response': newInvoice
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
    console.log(req.body);
    const newOrder = new Object(req.body);

    try {
        await newOrder.save();
        console.log('promise all');
            res.json({
                'response': newOrder
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
