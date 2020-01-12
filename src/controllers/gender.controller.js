const Gender = require('../models/gender.model');

const genderCtrl = {};

genderCtrl.getGenders = async (req, res) => {
    const genders = await Gender.find();
    res.json(genders);
};

/* genderCtrl.getGender = async (req, res) => {
    const genders = await Gender.findById(req.params.id);
    res.json(genders);
}; */

module.exports = genderCtrl;
