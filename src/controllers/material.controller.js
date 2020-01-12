const Material = require('../models/material.model');

const materialCtrl = {};

materialCtrl.getMaterials = async (req, res) => {
    const materials = await Material.find();
    res.json(materials);
};

materialCtrl.deleteMaterial = async (req, res) => {
    try {
        await Material.findByIdAndDelete(req.params.id);
        res.json({ status: 'Material deleted' });
    } catch {
        console.log(err);
        var error = {};
        error.message = err;
        error.status = 27017;
        //callback(error);
    }
};

materialCtrl.postMaterial = async (req, res, next) => {
    const newMaterial = new Material({
        description: req.body.description
    });

    try {
        await newMaterial.save();
        console.log('promise all');
            res.json({
                'response': newMaterial
            });
            res.send('brand received');

    } catch (err) {
        console.log(err);
        var error = {};
        error.message = err;
        error.status = 27017;
    }

}

materialCtrl.editMaterial = async(req, res, next) => {
    const filter = { _id: req.body._id };
    const update = {    description: req.body.description };
    try {
        let doc = await Material.findOneAndUpdate(filter, update, {
            upsert: true // Make this update into an upsert
          });
        res.json({ status: 'Material updated' });
    } catch {
        console.log(err);
        var error = {};
        error.message = err;
        error.status = 27017;
    }   
}
module.exports = materialCtrl;
