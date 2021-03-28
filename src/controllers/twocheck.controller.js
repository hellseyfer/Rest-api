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
    secretWord: process.env.TWOCHECK_SECRET_WORD,  // Secret Word, required for response and notification checks
    sandbox: true,
    secreKey: process.env.TWOCHECK_SECRET_KEY
});

const twocheckCtrl = {};

twocheckCtrl.getIPNNotifications = async (req, res) => {
    console.log(req.body);
    res.json({ status: 200 }).send("OK");
};

twocheckCtrl.postIPNNotifications = async (req, res) => {
    console.log(req.body);
    console.log(req.params);
    let hashString = '';
    let valueLengthInBytes;

    Object.keys(req.params).forEach(function(key) {
    valueLengthInBytes = byteLength(req.params[key].toString());
    if (valueLengthInBytes > 0) {
        hashString += valueLengthInBytes + req.params[key].toString();
    }
    });
    console.log("HASHSTRING: ", hashString);
    return hashString
};

twocheckCtrl.postInvoice = async (req, res) => {
    console.log("REQ: ", req.body);
    console.log("PARAMS: ", req.params)
    console.log("TCO: ", tco.notification.options.notification);
    if (tco.notification.valid(req.body)) {
        console.log("valid");
        console.log("1 ", tco.notification.options.notification);
        res.send("Valid");
    } else {
        console.log("invalid");
        res.send("Invalid");
    }

   /*  if (tco.notification.valid(body)) {
        //response.send("Valid");
    
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
        console.log("invalid");
        res.send("Invalid");
    } */

};

twocheckCtrl.postOrder = async (req, res) => {
/*     let body = req.body;
    console.log("REQ body : ", body);

    if (tco.notification.valid(body)) {
        //response.send("Valid");
    
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
        console.log("invalid");
        res.send("Invalid");
    } */

};

function byteLength(str) {      //mudar a helper
    let s = str.length;
    for (let i = str.length-1; i>=0; i--) {
    var code = str.charCodeAt(i);
    if (code > 0x7f && code <= 0x7ff) s++;
    else if (code > 0x7ff && code <= 0xffff) s+=2;
    if (code >= 0xDC00 && code <= 0xDFFF) i--;
    }
    return s;
}

module.exports = twocheckCtrl;
