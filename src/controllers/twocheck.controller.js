/* const TwoCheck = require('../models/twocheck.model'); */
const mongoose = require('mongoose');
const { Schema } = mongoose;

const twocheckCtrl = {};

twocheckCtrl.getNotifications = async (req, res) => {
    const notifications = res
    res.json(notifications);
};

twocheckCtrl.postInvoice = async (req, res) => {

        /*                            
    save without schema mongoose
    Ex:
    var thingSchema = new Schema({..}, { strict: false });
    var Thing = mongoose.model('Thing', thingSchema);
    var thing = new Thing({ iAmNotInTheSchema: true });
    thing.save() // iAmNotInTheSchema is now saved to the db!!
    */

    var TwoCheckInvoiceSchema = new Schema({}, { strict: false });
    var TestCollection = mongoose.model('TwoCheckInvoices', TwoCheckInvoiceSchema);
    let body = req.params
    console.log("REQ: ", body);

    const testCollectionData = new TestCollection(body)

    try {
        await testCollectionData.save()
        console.log('promise all');
            res.json({
                'response': testCollectionData
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

    var TwoCheckOrderSchema = new Schema({}, { strict: false });
    var TestCollection = mongoose.model('TwoCheckOrders', TwoCheckOrderSchema);
    let body = req.params
    console.log("REQ: ", body);

    const testCollectionData = new TestCollection(body);
    try {
        await testCollectionData.save();
        console.log('promise all');
            res.json({
                'response': testCollectionData
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
