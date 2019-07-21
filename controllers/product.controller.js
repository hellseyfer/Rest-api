
const Product = require('../models/product');

const productCtrl = {};

productCtrl.getProducts = async (req, res) => {
    const products = await Product.find();
    res.json(products);
};

productCtrl.getProduct = async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.json(product);
};


productCtrl.createProduct = async (req, res) => {
    const product = new Product({
        title: req.body.title,
        brand: req.body.brand,
        price: req.body.price,
        materials: req.body.materials
    });
    await product.save();
    res.json({
        'status': 'Product saved'
    });
};

productCtrl.editProduct = async (req, res) => {
    const { id } = req.params;
    const product ={
        title: req.body.title,
        brand: req.body.brand,
        price: req.body.price,
        materials: req.body.materials
    }
    await Product.findByIdAndUpdate(id, {$set: product}, { new: true });
    res.json({status: 'Product updated' });

};

productCtrl.deleteProduct = async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.json({status: 'Product deleted'});
};



module.exports = productCtrl;
