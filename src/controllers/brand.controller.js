const Brand = require('../models/brand.model');

const brandCtrl = {};

brandCtrl.getBrands = async (req, res) => {
    const brands = await Brand.find();
    res.json(brands);
};

brandCtrl.getBrand = async (req, res) => {
    const brands = await Brand.find();
    res.json(brands);
};

brandCtrl.deleteBrand = async (req, res) => {
    try {
        await Brand.findByIdAndDelete(req.params.id);
        res.json({ status: 'Brand deleted' });
    } catch {
        console.log(err);
        var error = {};
        error.message = err;
        error.status = 27017;
        //callback(error);
    }
};

brandCtrl.postBrand = async (req, res, next) => {
    const newBrand = new Brand({
        description: req.body.description
    });

    try {
        await newBrand.save();
        console.log('promise all');
            res.json({
                'response': newBrand
            });
            res.send('brand received');

    } catch (err) {
        console.log(err);
        var error = {};
        error.message = err;
        error.status = 27017;
    }

}

brandCtrl.editBrand = async(req, res, next) => {
    const filter = { _id: req.body._id };
    const update = {    description: req.body.description };
    try {
        let doc = await Brand.findOneAndUpdate(filter, update, {
            upsert: true // Make this update into an upsert
          });
        res.json({ status: 'Brand updated' });
    } catch {
        console.log(err);
        var error = {};
        error.message = err;
        error.status = 27017;
    }   
}

module.exports = brandCtrl;
