const User = require('../models/user.model');
const Checkout = require('../models/checkout.model');

const userCtrl = {};

userCtrl.getUsers = async (req, res) => {
    const users = await User.find();
    res.json(users);
};

userCtrl.getUser = async (req, res) => {
    const user = await User.findById(req.params.uid);
    res.json(user);
};

userCtrl.postUser = async (req, res, next) => {
    const newUser = new Sizes({
        UID: req.body.uid
    });

    try {
        await newUser.save();
        console.log('promise all');
            res.json({
                'response': newUser
            });
            res.send('brand received');

    } catch (err) {
        console.log(err);
        var error = {};
        error.message = err;
        error.status = 27017;
    }
}


/* genderCtrl.getGender = async (req, res) => {
    const genders = await Gender.findById(req.params.id);
    res.json(genders);
}; */




module.exports = userCtrl;
