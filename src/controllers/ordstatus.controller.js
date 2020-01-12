const OrdStatus = require('../models/ordstatus.model');
//const OrdStatus = require('../models/gender.model');
const Invoices = require('../models/invoice.model');

const ordstatusCtrl = {};

ordstatusCtrl.getStatus = async (req, res) => {
    try{
        const ordstatus = await OrdStatus.find();
        console.log(ordstatus);
        res.json(ordstatus);
    } catch(err) {
        console.log(err);
        res.json({status: err});
    }
};

ordstatusCtrl.setStatus = async (req, res) => {
    try{
        //console.log(req.params.status);
        //console.log('body ', req.body);
        let update = { status: req.params.status};
        const invoice = await Invoices.findByIdAndUpdate(req.body._id, update);
        res.json({status: 'invoice updated'});
    }catch(err){
        console.log(err);
        res.json({status: err});
    }
}

/* genderCtrl.getGender = async (req, res) => {
    const genders = await Gender.findById(req.params.id);
    res.json(genders);
}; */

module.exports = ordstatusCtrl;
