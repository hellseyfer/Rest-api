const Address = require('../models/address.model');
const User = require('../models/user.model');

const addressCtrl = {};

addressCtrl.getAddressesById = async (req, res) => {
    try{
        let filter = { "UID": req.params.uid };
        const user = await User.find(filter);
        res.json(user);
        //console.log(user);
    } catch(err){
        console.log(err);
        res.json({status: "error fetching"});
    }
    
};

addressCtrl.postAddress = async (req, res, next) => {
    //console.log(req.body);
    try {
        req.body.shippingInfo.map(async data => {
            const newAddress = new Address({
                address: data.address,
                alias: data.alias,
                fullName: data.fullName,
                phone: data.phone,
            })

            let filter = { "UID": req.params.uid }
            let update = { $push: { "addresses": newAddress } }
            // insert variation on product
            const user = await User.updateOne(filter, update, { upsert: true, }).then(asd => {
                res.json({ status: 'address saved' });
            });
        });
    } catch (err) {
        console.log(err);
        res.json({ status: err });
    }
}

addressCtrl.editAddress = async(req, res, next) => {
    //console.log(req.body.shippingInfo);
    const filter = { "UID": req.params.uid, "addresses._id": req.body.shippingInfo[0]._id };
    //const update = { $set: { addresses: req.body.shippingInfo[0] }};
    const update = { $set: { "addresses.$.fullName": req.body.shippingInfo[0].fullName,
                            "addresses.$.alias": req.body.shippingInfo[0].alias,
                            "addresses.$.phone": req.body.shippingInfo[0].phone,
                            "addresses.$.address": req.body.shippingInfo[0].address }};
    try {
        let doc = await User.update(filter, update, {
            upsert: true // Make this update into an upsert
          });
        res.json({ status: 'Address updated' });
    } catch {
        console.log(err);
        var error = {};
        error.message = err;
        error.status = 27017;
    }   
}

module.exports = addressCtrl;
