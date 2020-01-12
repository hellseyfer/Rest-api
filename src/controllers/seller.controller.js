const Seller = require('../models/seller.model');
const Product = require('../models/product.model');

const sellerCtrl = {};

sellerCtrl.getSellers = async (req, res) => {
    const seller = await Seller.find();
    res.json(seller);
};

sellerCtrl.getSeller = async (req, res) => {
    //console.log('param: ', req.params.id);
    const seller = await Seller.findOne({ UID: req.params.id })
        .populate({
            path: 'stocks',
            populate: { path: 'colle', path: 'gender' }
        }) // join foreign document stocks
        .exec((err, product) => {
            if (err) return handleError(err);
            // prints "The author is Ian Fleming"
            res.json(product);
        });
};

sellerCtrl.updateSeller = async (uid, productID) => {
    console.log(uid, productID);
    const seller = await Seller.findOne({ UID: uid })
        .exec(async(err, doc) => {
            if (doc) {
                console.log("seller already exists");
                let filter = { "UID": uid }
                let update = { $push: { "stocks": productID } }
                try {
                    const res = await Seller.updateOne(filter, update, { upsert: true });
                } catch (err) {
                    console.log(err);
                    var error = {};
                    error.message = err;
                    error.status = 27017;
                }
            } else {
                console.log("seller doesnt exist");
               
            }
        });

    }

    sellerCtrl.postSeller = async (req, res) => {
        const seller = await Seller.findOne({ UID: req.params.uid })
            .exec(async(err, doc) => {
                if(!doc){
                    const newSeller = new Seller({
                        UID: req.params.uid
                    });
                    try{
                        await newSeller.save();
                        res.json({ status: 'seller saved'});
                    } catch(err){
                        console.log(err);
                        res.json({status: 'error saving'});
                    }
                } else {
                    console.log("trying to post an existent seller");
                    let filter = { "UID": req.params.uid }
                    let update = { $set: { "status": "active" } }
                    // insert variation on product
                    try{
                        const updated = await Seller.updateOne(filter, update, { upsert: true })
                        res.json({ status: 'user updated'});
                    } catch(err){
                        console.log(err);
                        res.json({status: 'error updating'});
                    }
                    res.json({status: 'seller already exists, is active now'})
                }
            }) 
    }

    sellerCtrl.revokeSeller = async (req, res) => {
        console.log("revoke: ", req.params.uid)
        let filter = { "UID": req.params.uid }
        let update = { $set: { "status": "banned" } }
        // insert variation on product
        try{
            const updated = await Seller.updateOne(filter, update, { upsert: true })
            res.json({ status: 'user updated'});
        } catch(err){
            console.log(err);
            res.json({status: 'error updating'});
        }
    }


module.exports = sellerCtrl;
