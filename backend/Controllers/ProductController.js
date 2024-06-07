const express = require("express");
const route = express.Router();
const Product = require("../Models/Product");
const VerifyToken = require("../Middleware/VerifyToken");
const upload = require("../Utils/StorageFiles");
const path = require("path");
const fs = require("fs")


route.get("/products", async (req, res) => {
    try {
        const getProducts = await Product.find().populate("author","username");

        res.status(200).json(getProducts);
    } catch (er) {
        res.status(500).json({ message: er.message });
    }
});

route.get("/product/:id", async (req, res) => {
    try {
        const getProduct= await Product.findById(req.params.id);
        res.status(200).json(getProduct);
    } catch (er) {
        res.status(500).json({ message: er.message });
    }
});

route.get("/product/:categoryId", async (req, res) => {
    try {
        const categoryId = req.params.categoryId
        const getProduct = await Project.find({category: categoryId}).populate("category", "name");
        if(!getProduct){
            res.json({message:"ekjfheufef"})
        }
        res.status(200).json(getProduct);
    } catch (er) {
        res.status(500).json({ message: er.message });
    }
});

route.post("/product/create", VerifyToken, upload.single("image"),  async (req, res) => {
    const { title, description, price } = req.body;
    const createProduct = new Product({ title, description,price, author:req.user, image:req.file.filename });
    const savProduct = await createProduct.save();

    res.status(200).json(savProduct);
});

route.put("/product/edit/:id", upload.single("image"), async (req, res) => {
    try {
        const productId = req.params.id;
        const updateProductData = req.body;
        const existingProduct = await Product.findById(productId);

        if(!existingProduct){
            res.status(404).json({message:"had lprod makaynch"});
        }

        existingProduct.title = updateProductData.title;
        existingProduct.description = updateProductData.description;

        if(req.file){
            if(existingProduct.image){
                const imagePath = path.join(__dirname, "..", "uploads", existingProduct.image);
                fs.unlinkSync(imagePath)
            }
            existingProduct.image = req.file.filename;
        }

        const updateData = await existingProduct.save();

        res.json(updateData);



        /*const updatProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });

        if (!updatProduct) {
            return res.status(404).json({ message: "had lproduct rah makaynch" });
        }*/
    } catch (er) {
        res.status(500).json({ message: er.message });
    }
});

route.delete("/product/delete/:id", async (req, res) => {
    try {

        const product = await Product.findById(req.params.id);
        if(!product){
            res.json({message: "prod makaynch"})
        }

        await Product.findByIdAndDelete(req.params.id);

        if(product.image){
            const imagePath = path.join(__dirname, "..", "uploads", product.image);
            fs.unlinkSync(imagePath)
        }

        res.json({message:"rah tsuprima m3a limage"})

        /*const deleteProduct = await Product.findByIdAndDelete(req.params.id);

        if (!deleteProduct) {
            return res.status(404).json({ message: "had lproduct rah makaynch" });
        }

        res.json({ message: "product rah tsuprima" });*/
    } catch (er) {
        res.status(500).json({ message: er.message });
    }
});


module.exports = route;
