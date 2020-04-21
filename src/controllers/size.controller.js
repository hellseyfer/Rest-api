const Size = require('../models/size.model');
const Sizes = require('../models/sizes.model');

const sizeCtrl = {};

sizeCtrl.getSizes = async (req, res) => {
    const sizes = await Size.find();
    res.json(sizes);
};

sizeCtrl.getSize = async (req, res) => {
    const size = await Size.findById(req.params.id);
    res.json(size);
};

sizeCtrl.postSizes = async (req, res, next) => {
    console.log(req.body);
    console.log(req.body.size);
    const newSizes = new Sizes({
        description: req.body.description,
    });
            await newSizes.save();
            // update size array
        let filter = { "_id": newSizes._id }
        let update2 = { $push: { "size": req.body.size } }         
        const resp = await Sizes.updateOne(filter, update2, { upsert: true, });
        res.json({ status: 'Sizes updated' }); 
}

sizeCtrl.editSizes = async(req, res, next) => {
    const filter = { _id: req.body._id };
    const update = {    description: req.body.description   };
    try {
        // update description
        let doc = await Sizes.findOneAndUpdate(filter, update, {
            upsert: true // Make this update into an upsert
          });

          doc.set('size', undefined, { strict: false }); // setting size array to null
          console.log('after: ', doc);
          await doc.save(); // saving with size = null

        // update size array
        let update2 = { $push: { "size": req.body.size } }         
        const resp = await Sizes.updateOne(filter, update2, { upsert: true, });
        res.json({ status: 'Sizes updated' });
        //res.json({ status: 'Sizes updated' });
    } catch(err) {
        console.log(err);
        var error = {};
        error.message = err;
        res.json({ status: err });
    }   
}

sizeCtrl.deleteSizes = async (req, res) => {
    try {
        await Sizes.findByIdAndDelete(req.params.id);
        res.json({ status: 'Sizes deleted' });
    } catch(err) {
        console.log(err);
        var error = {};
        error.message = err;
        res.json({ status: err });
    }
};

module.exports = sizeCtrl;
