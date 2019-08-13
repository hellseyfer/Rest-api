const express = require('express');
const _router = express.Router();
const path = require('path');
const fs = require('fs-extra');
const Image = require('../models/image.model');
const Product = require('../models/product.model');

const cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: `${process.env.CLOUDINARY_NAME}`,
    api_key: `${process.env.CLOUDINARY_API}`,
    api_secret: `${process.env.CLOUDINARY_SECRET}`
})



/* multiple files vs single
Instead of upload.single('image') you want to do upload.array('image'), and then look at req.files instead of req.file.
*/

// var upload = multer({storage:store}).single('file');

_router.post('/cloudy', async (req, res, next) => {
    const { title, description } = req.body;
    // console.log(req.file);
    const result = await cloudinary.v2.uploader.upload(req.files.path);
    // console.log(result);
    const newImage = Image({
        title,
        description,
        imageURL: result.url,
        public_id: result.public_id
    })
    await newImage.save();
    await fs.unlink(req.file.path);
    res.send('received');
});


_router.post('/cloudy2', async (req, res, next) => {
    let imageArray = new Array;
        // console.log('body: ', req.body);
        // console.log('files', req.body.images);
        // res_promises will be an array of promises
        /* let res_promises = req.files.map(file => new Promise((resolve, reject) => {
            cloudinary.v2.uploader.upload(file.path, { use_filename: true, unique_filename: false }, function (error, result) {
        */
        let res_promises = req.body.images.map(file => new Promise(async (resolve, reject) => {
            await cloudinary.v2.uploader.upload(file.url, { use_filename: true, unique_filename: false }, function (error, result) {
                if(error) reject(error)
                else{ // resolve(result.public_id)
                    //console.log(result.public_id);
                    resolve(result.public_id);
                    const { title, description } = req.body;
                    // create new image regist
                    const newImage = new Image({
                        title,
                        description,
                        imageURL: result.url,
                        public_id: result.public_id
                    });
                    newImage.save();    // guarda en directorio public/uploads
                    // fs.unlink(file.path);   // borra lo recien guardado
                    // fs.unlink(file.url);
                    imageArray.push(newImage);  // agrega nuevo objeto al array
                    // console.log(newImage);
                }
            })            
        })
        )   
        // Promise.all will fire when all promises are resolved 
        Promise.all(res_promises)
        .then(async result =>  {
            console.log('promise all');
            res.json({'response': result});
            // console.log(imageArray);
            //const { title, brand, price } = req.body;
            const newProduct = new Product({
                title: req.body.title,
                brand: req.body.brand,
                price: req.body.price,
                materials: req.body.materials,
                images: imageArray
            });
            await newProduct.save();
            res.send('product received');
            console.log(newProduct);
        })
        .catch((error) => { error})
    });

_router.post('/upload', (req,res,next) => {
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


_router.get('/download', function(req,res,next){
    filepath = path.join(__dirname,'../public/uploads') +'/'+ req.body.filename;
    res.sendFile(filepath);
});

module.exports = _router;