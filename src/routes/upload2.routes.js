const express = require('express');
const _router = express.Router();
const path = require('path');
const fs = require('fs-extra');
const Image = require('../models/image.model');
const Product = require('../models/product.model');
const Variation = require('../models/variation.model');
const Size = require('../models/size.model');

const cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: `${process.env.CLOUDINARY_NAME}`,
    api_key: `${process.env.CLOUDINARY_API}`,
    api_secret: `${process.env.CLOUDINARY_SECRET}`
})

_router.post('/cloudy2', async (req, res, next) => {
    // console.log(req);
    const product = new Product({
        title: req.body.title,
        brand: req.body.brand,
        price: req.body.price,
        materials: req.body.materials,
        gender: req.body.gender,
        colle: req.body.colle,
        description: req.body.description
    });

    await product.save();

    let res_promises = req.body.varia.map(variacion => new Promise(async (resolve, reject) => {
        // new variation
        const newVariation = new Variation({
            description: variacion.description
        })

        let filter = { "_id": product._id }
        let update = { $push: { "varia": newVariation } }
        // insert variation on product
        const res = await Product.updateOne(filter, update, { upsert: true })
/*         console.log('matched product: ', res.n);
        console.log('modified: ', res.n); */

        // end new variation

        // make sizes array
        await variacion.sizes.map(async item => {
            console.log('item: ', item);
            try {
                const size = new Size({
                    description: item.description,
                    stock: item.stock
                });
                //sizeArr.push(size);
                let filter = { "_id": product._id, "varia._id": newVariation._id };
                let update = { $push: { "varia.$.sizes": size } };
                const res = await Product.updateOne(filter, update, { upsert: true });
                /* console.log('matched varia 1: ', res.n);
                console.log('modified 1: ', res.n); */
            } catch (err) {
                var error = {};
                error.message = err;
                error.status = 27017;
                console.log(err);
            }
        }),

            // add images to variation
            await variacion.images.map(image => {
                cloudinary.v2.uploader.upload(image.url, {
                    use_filename: true,
                    unique_filename: false
                }, async (error, result) => {
                    if (error) reject(error)
                    else {
                        try {
                            //console.log(result);
                            resolve(result.public_id);
                            const {
                                title,
                                description
                            } = req.body;
                            // create new image regist
                            const image = new Image({
                                title,
                                description,
                                imageURL: result.url,
                                public_id: result.public_id
                            });

                            //let filter = { _id: variation._id }
                            let filter = { "_id": product._id, "varia._id": newVariation._id }
                            let update = { $push: { "varia.$.images": image } }
                            const res = await Product.updateOne(filter, update, { upsert: true })
                            /* console.log('matched varia 2: ', res.n);
                            console.log('modified 2: ', res.n); */

                        } catch (err) {
                            var error = {};
                            error.message = err;
                            error.status = 27017;
                            console.log(err);
                        }
                    }
                }) // end upload

            })
    })
    ) // end map

    // update seller collection
    sellerCtrl.postSeller(uid, product.id);

    // Promise.all will fire when all promises are resolved 
    Promise.all(res_promises)
        .then(async result => {
            console.log('promise all');
          /*   res.json({
                'response': product
            }); */
            res.json({ status: 'Product uploaded' });
        })
        .catch((error) => {
            error
        })
});

_router.post('/upload', (req, res, next) => {
    /*
    console.log(req.file);
    upload(req, res, (err) => {
        if(err){
            return res.status(501).json({error:err});
        }
        //do all database record saving activity
        return res.json({
            originalname:req.file.originalname, 
            uploadname:req.file.filename});
    });
    */
});


_router.get('/download', function (req, res, next) {
    filepath = path.join(__dirname, '../public/uploads') + '/' + req.body.filename;
    res.sendFile(filepath);
});

module.exports = _router;