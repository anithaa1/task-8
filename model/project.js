
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    productname:{ 

        type: String,
        required: true
    },
     brand:{
        type: String,
        required: true
     },
     price:{

        type: Number,
        required: true
     },
     color:{
        type: String,
        required: true
     }
    })
     const product = mongoose.model('product', userSchema)

     module.exports = product;








  