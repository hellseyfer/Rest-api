const Invoice = require('../models/invoice.model');
const Order = require('../models/order.model');
const User = require('../models/user.model');

const invoiceCtrl = {};

invoiceCtrl.postInvoice = async (req, res, next) => {
    try {
        //let arrOrders =[];
        const newInvoice = new Invoice({
            items: req.body.items,
            total: req.body.total,
            shippingInfo: req.body.shippingInfo
        });

        await newInvoice.save();

        let filter3 = { "UID": req.params.uid }
        let update3 = { $push: { "invoices": newInvoice._id } }
        // insert variation on product
        let doc2 = await User.updateOne(filter3, update3, { upsert: true }).then(asd => {
            res.json({ status: 'checkout success' });
        });

    } catch (err) {
        console.log(err);
        res.json({ status: err });
    }
}

invoiceCtrl.getInvoice = async (req, res) => {
    try {
        let filter = { "UID": req.params.uid }
        const invoice = await User.find(filter).populate('invoices').exec(function (err, invoice) {
            res.json(invoice);
        });
    } catch (err) {
        res.json(err);
    }
};

invoiceCtrl.getInvoices = async (req, res) => {
    try {
        //let filter = { "UID": req.params.uid }
        const invoices = await Invoice.find()
                                .limit(10)
                                .sort({number: -1});
        res.json(invoices);
    } catch (err) {
        res.json(err);
    }
};

module.exports = invoiceCtrl;
