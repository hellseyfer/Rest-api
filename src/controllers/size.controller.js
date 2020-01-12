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
    const newSizes = new Sizes({
        description: req.body.description,
    });
            await newSizes.save();
            let res_promises = req.body.size.map(siz => new Promise(async (resolve, reject) => {
                const newSize = new Size({
                    description: siz.description
                });

                let filter = { "_id": newSizes._id }
                let update = { $push: { "size": newSize } }
                // insert variation on product
                const res = await Sizes.updateOne(filter, update, { upsert: true, })
                resolve(res._id); // need to Promise.all
            }))

            Promise.all(res_promises)
            .then(async result => {
                console.log('promise all');
                res.json({
                    'response': newSizes
                });
                res.send('sizes received');
            })
            .catch((error) => {
                error
            })    
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
          console.log(doc);
          await doc.save(); // saving with size = null

        // update size array
        let res_promises = req.body.size.map(siz => new Promise(async (resolve, reject) => {
            const newSize = new Size({
                description: siz.description
            });
            
            let update2 = { $push: { "size": newSize } }         
            const res = await Sizes.updateOne(filter, update2, { upsert: true, })
            resolve(res._id); // need to Promise.all
        }))
        
        Promise.all(res_promises)
            .then(async result => {
                console.log('promise all');
                res.json({
                    status: 'Sizes updated'
                });
                res.send('sizes received');
            })
            .catch((error) => {
                error
            })        
        //res.json({ status: 'Sizes updated' });
    } catch {
        console.log(err);
        var error = {};
        error.message = err;
        error.status = 27017;
    }   
}

sizeCtrl.deleteSizes = async (req, res) => {
    try {
        await Sizes.findByIdAndDelete(req.params.id);
        res.json({ status: 'Sizes deleted' });
    } catch {
        console.log(err);
        var error = {};
        error.message = err;
        error.status = 27017;
        //callback(error);
    }
};


module.exports = sizeCtrl;
