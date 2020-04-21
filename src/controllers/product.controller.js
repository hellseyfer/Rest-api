const Product = require('../models/product.model');
const Gender = require('../models/gender.model');
const Collection = require('../models/collection.model');
const Variation = require('../models/variation.model');
const Image = require('../models/image.model');
const Size = require('../models/size.model');
const sellerCtrl = require('../controllers/seller.controller');

const productCtrl = {};

const cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: `${process.env.CLOUDINARY_NAME}`,
    api_key: `${process.env.CLOUDINARY_API}`,
    api_secret: `${process.env.CLOUDINARY_SECRET}`
})


productCtrl.getProdUpdates = async(req, socket, res) =>{
    if (req) {
        //let filter = { "_id": item.product._id, "varia": item.varia, "sizes": item.size };

        ///let filter = { "_id": item.product._id };
        try {
            const res_promises = req.map(async item => {
                let id = item.product._id;
                //const data = await Product.findById(id, 'varia');
                const data = await Product.findById(id);
                return data
            });
            Promise.all(res_promises)
                .then(async result => {
                    console.log('promise all');
                    socket.emit('update_stock', result);
                    //socket.emit('update_stock', result);
                    //console.log(result);
                })
                .catch((error) => {
                    error
                });

        } catch (err) {
            console.log(err);
        }
    } else {
        console.log('nada');
        io.sockets.emit("update", { status: "All messages are delivered" });
    }
}

productCtrl.getProducts = async (req, res) => {
    const products = await Product.find();
    res.json(products);
};

productCtrl.getProductsByGender = async (req, res) => {
    const genderObj = await Gender.findOne({ description: req.params.gender });
    const products = await Product.find({ gender: genderObj._id });
    res.json(products);
};

productCtrl.getProductsByCollection = async (req, res) => {
    try {
        const genderObj = await Gender.findOne({ description: req.params.gender });
        const colleObj = await Collection.findOne({ description: req.params.collection, gender: genderObj._id });
        /* const products = await Product.find({colle: colleObj._id}); */
        const products = await Product.find({ colle: colleObj._id })
        res.json(products);
    } catch (err) {
        var error = {};
        error.message = err;
        error.status = 27017;
        console.log(err);
    }

};

productCtrl.getProduct = async (req, res) => {
    /* const product = await Product.findById(req.params.id);
    res.json(product); */
    const product = await Product.findById(req.params.id).populate('colle').exec(function (err, product) {
        if (err) return handleError(err);
        //console.log('stocks: ', stocks);
        // prints "The author is Ian Fleming"
        res.json(product);
    });
    //res.json(product);
};


productCtrl.postProduct = async (req, res) => {
    // console.log(req);
    const product = new Product({
        title: req.body.title,
        brand: req.body.brand,
        price: req.body.price,
        materials: req.body.materials,
        gender: req.body.gender,
        colle: req.body.colle,
        description: req.body.description,
        weight: req.body.weight,
        region: req.body.region,
        tags: req.body.tags
        //inland_ship_cost: req.body.inland_ship_cost
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
        let filter2 = { "_id": product._id, "varia._id": newVariation._id };
        let update2 = { $push: { "varia.$.sizes": variacion.sizes } };
        const resp = await Product.updateOne(filter2, update2, { upsert: true });

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
                                //description,
                                imageURL: result.secure_url,
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

    // Promise.all will fire when all promises are resolved 
    Promise.all(res_promises)
        .then(async result => {
            console.log('promise all');
            // update seller collection
            sellerCtrl.updateSeller(req.params.uid, product.id);
            res.json({ status: 'Product uploaded' });
        })
        .catch((error) => {
            error
        })

}

productCtrl.editProduct = async (req, res) => {
    const productID = req.params.id;

    const filter = { _id: req.params.id };
    const update = {
        title: req.body.title,
        brand: req.body.brand,
        price: req.body.price,
        brand: req.body.brand,
        gender: req.body.gender,
        description: req.body.description,
        materials: req.body.materials,
        colle: req.body.colle,
        weight: req.body.weight,
        region: req.body.region,
        tags: req.body.tags
        //varia: req.body.varia
    };
    try {
        let doc = await Product.findOneAndUpdate(filter, update, {
            upsert: false // Make this update into an upsert
        });

    } catch(err) {
        console.log(err);
        res.json({status: err});
    }

    let res_promises = req.body.varia.map((variacion, index) => new Promise(async (resolve, reject) => {
        if (!variacion._id) {
            const newVariation = new Variation({
                description: variacion.description
            })
            // New varia ID !
            var variaID = newVariation._id;

            let filter = { "_id": productID }
            let update = { $push: { "varia": newVariation } }
            // insert variation on product
            const doc = await Product.updateOne(filter, update, { upsert: true, })


            // make sizes array
            let filter2 = { "_id": productID, "varia._id": newVariation._id };
            let update2 = { $push: { "varia.$.sizes": variacion.sizes } };
            const resp = await Product.updateOne(filter2, update2, { upsert: true });

        } else {
            variaID = variacion._id;
            console.log("vId: ", variacion._id);

            // setting size array to null
            let filter = { "_id": productID, "varia._id": variaID };
            let update = { $set: { "varia.$.sizes": []  }};
            await Product.updateOne(filter, update, { upsert: true });

             // remake sizes array
             let update2 = { $push: { "varia.$.sizes": variacion.sizes } };
             const resp = await Product.updateOne(filter, update2, { upsert: true });
        }

        await variacion.images.map(image => {
            // upload only if image.url
            if (image.url) {
                // console.log(image.url);
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
                                //description,
                                imageURL: result.secure_url,
                                public_id: result.public_id
                            });

                            //let filter = { _id: variation._id }
                            let filter = { "_id": productID, "varia._id": variaID };
                            let update = { $push: { "varia.$.images": image } };
                            const resp = await Product.updateOne(filter, update, { upsert: true });
                            console.log('matched varia 2: ', resp.n);
                            console.log('modified 2: ', resp.n);

                        } catch (err) {
                            var error = {};
                            error.message = err;
                            error.status = 27017;
                            //callback(error, null);
                            console.log(err);
                        }
                    }
                }) // end upload 
            } else {
                resolve();
            }
        })
        Promise.all(res_promises)
            .then(async result => {
                console.log('promise all');
                res.json({ status: 'Product updated' });
            })
            .catch((error) => {
                res.json({ status: error });
                error
            })
    }))

}


productCtrl.deleteProduct = async (req, res) => {
    /*   await Product.findByIdAndDelete(req.params.id);
      res.json({ status: 'Product deleted' }); */
    console.log(req.params.id);
    try {
        let filter = { "_id": req.params.id }
        let update = { $set: { status: "deleted" } };
        await Product.updateOne(filter, update, { upsert: true });
        res.json({ status: 'Product deleted' });
    } catch (err) {
        console.log(err);
        res.json({ status: err });
    }
};

productCtrl.deleteVaria = async (req, res) => {
    try {
        let filterProduct = { "_id": req.params.product_id }
        await Product.updateOne(filterProduct,  { $pull: {varia: { _id: req.params.varia_id} } } );
        res.json({ status: 'Varia deleted' });
    } catch (err) {
        console.log(err);
        res.json({ status: err});
    }
}

productCtrl.deletePhoto = async (req, res) => {
    try {
        let filter = { "_id": req.params.product_id, "varia._id": req.params.varia_id };
        await Product.updateOne(filter,  { $pull: { "varia.$.images": { "public_id": req.params.image_public_id } } } );
        res.json({ status: 'Photo deleted' });
    } catch (err) {
        console.log(err);
        res.json({ status: err});
    }
}

productCtrl.pauseProduct = async (req, res) => {
    /*   await Product.findByIdAndDelete(req.params.id);
      res.json({ status: 'Product deleted' }); */
    console.log(req.params.id);
    try {
        let filter = { "_id": req.params.id }
        let update = { $set: { status: "paused" } };
        await Product.updateOne(filter, update, { upsert: true });
        res.json({ status: 'Product paused' });
    } catch (err) {
        console.log(err);
        res.json({ status: err });
    }

};

productCtrl.activeProduct = async (req, res) => {
    /*   await Product.findByIdAndDelete(req.params.id);
      res.json({ status: 'Product deleted' }); */
    //console.log(req.params.id);
    try {
        let filter = { _id: req.params.id }
        let update = { $set: { status: "active" } };
        await Product.updateOne(filter, update, { upsert: true });
        res.json({ status: 'Product activated' });
    } catch (err) {
        console.log(err);
        res.json({ status: err });
    }

};

productCtrl.updateStockProduct =  async (req, res) => {
    try {
        console.log(req.params.newqty);
        let filter = { _id: req.params.id, "varia.description": req.params.varia };
        let update = { $set: { "varia.$.sizes.$[i].stock": req.params.newqty }};
        await Product.updateOne(filter, update, 
            { arrayFilters: [{"i.description": req.params.size}] }
            );

        res.json({ status: 'Product updated' });
    } catch (err) {
        console.log(err);
        res.json({ status: err });
    }
};

module.exports = productCtrl;
