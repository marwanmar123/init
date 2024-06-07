const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    title: { type: String, require: true, trim: true },
    description:{type:String, require:true},
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    image:{type:String},
    price:{type:Number}
});

module.exports = mongoose.model("Products", productSchema);
