const product = require('../model/project');
const helper=require("../lib/helper");


async function createDetails(input) {
    const { productname, brand, price, color } = input;

    const newProduct = new product({
        productname: productname,
        brand: brand,
        price: price,
        color: color
    });

    try {
        let data = await newProduct.save();
        return { isSuccess: true, message: "Product created successfully!", data: data };
    } catch (err) {
        return { isSuccess: false, message: "Unable to create product", data: err };
    }
}

async function getAllProduct() {
    // console.log("recordData", {recordData});
    debugger;
    try {
        const viewdetails = await product.find({});
        if (!viewdetails || viewdetails.length === 0) {
            return { isSuccess: false, message: "No records Found!" };
        }
        return { isSuccess: true, message: "Product Details retrieved Successfully!!", data: viewdetails };
    } catch (err) {
        return { isSuccess: false, message: "Product Details are not Found", data: err };
    }
}
async function getById(id) {
    debugger;
    try {

        const products = await product.findById(id);

        if (!products) {
            return { success: false, message: 'Product not found' };
        }

        return { success: true, message: 'Product found', data: products }
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Internal Server Error' }
    }
}

 module.exports={createDetails:createDetails,getAllProduct:getAllProduct,getById:getById}