/* const TwoCheck = require('../models/twocheck.model'); */
const TwoCheckInvoice = require('../models/twocheck_invoice.model');
const TwoCheckOrder = require('../models/twocheck_order.model');
const Twocheckout = require('2checkout-node');

// Pass in your private key and seller ID
var tco = new Twocheckout({
    apiUser: process.env.TWOCHECK_API_USER,                              // Admin API Username, required for Admin API bindings
    apiPass: process.env.TWOCHECK_API_PASS,                              // Admin API Password, required for Admin API bindings
    sellerId: process.env.TWOCHECK_SELLER_ID,                                    // Seller ID, required for all non Admin API bindings 
    privateKey: process.env.TWOCHECK_PRIVATE_KEY,     // Payment API private key, required for checkout.authorize binding
    secretWord: process.env.TWOCHECK_SECRET_WORD  // Secret Word, required for response and notification checks
});

const twocheckCtrl = {};

twocheckCtrl.getNotifications = async (req, res) => {
    const notifications = res
    res.json(notifications);
};

twocheckCtrl.postInvoice = async (req, res) => {
    if (tco.notification.valid(req.body)) {
        //response.send("Valid");
        
        let body = req;
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
    } else {
        res.send("Invalid");
    }

};

twocheckCtrl.postOrder = async (req, res) => {
    if (tco.notification.valid(req.body)) {
        //response.send("Valid");
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
    } else {
        res.send("Invalid");
    }

};

module.exports = twocheckCtrl;
