const Collection = require('../models/collection.model');
const Gender = require('../models/gender.model');

const collectionCtrl = {};

collectionCtrl.getCollections = async (req, res) => {
    const collections = await Collection.find();
    res.json(collections);
};

collectionCtrl.getCollectionById = async (req, res) => {
    const collections = await Collection.findById(req.params.id);
    res.json(collections);
};

collectionCtrl.getCollectionByGender = async (req, res) => {
    const genderObj = await Gender.findOne({ description: req.params.gender });
    const collection = await Collection.find({ gender: genderObj._id });
    res.json(collection);
    //const collection = await Collection.find({ gender:req.params.gender }).populate('gender');
};

collectionCtrl.deleteCollection = async (req, res) => {
    await Collection.findByIdAndDelete(req.params.id);
    res.json({ status: 'Collection deleted' });
};

collectionCtrl.postCollection = async (req, res, next) => {
    const newColle = new Collection({
        description: req.body.description,
        gender: req.body.gender,
        sizes: req.body.sizes,
        special: req.body.special,
        expiry: req.body.expiry
    });

    try {
        await newColle.save();
        console.log('promise all');
            res.json({
                'response': newColle
            });
            //res.send('collection received');

    } catch (err) {
        console.log(err);
        var error = {};
        error.message = err;
        error.status = 27017;
    }

}

collectionCtrl.editCollection = async(req, res, next) => {
    const filter = { _id: req.body._id };
    const update = {    description: req.body.description,
                        gender: req.body.gender,
                        sizes: req.body.sizes,
                        special: req.body.special,
                        expiry: req.body.expiry };
    try {
        let doc = await Collection.findOneAndUpdate(filter, update, {
            upsert: true // Make this update into an upsert
          });
        res.json({ status: 'Collection updated' });
    } catch {
        console.log(err);
        var error = {};
        error.message = err;
        error.status = 27017;
    }   
}

module.exports = collectionCtrl;
