const express = require('express');
const router = express.Router();
const services = require('../service/service');
const helper = require('../lib/helper');
const { check, validationResult } = require('express-validator');
const service = require('../service/service');



router.post('/', [
    check('productname').isLength({ min: 4, max: 7 }).withMessage('Product name must contain at least 4 characters'),
    check('brand').isLength({ min: 2 }).withMessage('Brand must contain at least 2 characters'),
    check('color').isLength({ min: 3 }).withMessage('Color must contain at least 3 characters'),
    check('price').isNumeric().withMessage('Price must be a valid number'),

  ], async (req, res) => {
    try {
      // ERROR VALIDATION
      const errors = validationResult(req);
      console.log("errr",errors);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          errors: errors.array(),
        });
      }
  console.log("body",req.body);
      // Check if req.body is not empty
      if (Object.keys(req.body).length > 0) {
    
        const newResult = await services.createDetails(req.body); 
        console.log("new",newResult);
        return helper.SendResponse(res, newResult);
      } else {
        // Handle the case where req.body is empty
        return res.status(400).json({
          success: false,
          errors: [{ msg: 'Request body is empty.' }],
        });
      }
    } catch (err) {
      return helper.SendErrorResponse(err, res);
    }
  });
  router.get('/', async (req, res) => {
    try {
        //var recordData = req.query; // Uncomment this line if you want to pass query parameters
        var recordResult = await services.getAllProduct();
        // console.log("recordResult", recordResult);
        return helper.SendResponse(res, recordResult);
    } catch (err) {
        return helper.SendErrorResponse(err, res);
    }
});
router.get('/:id', async (req, res) => {
    try {
        //var authHeader = req.headers['authorization'];
        var orderResult = await services.getById(req.params.id);
        return helper.SendResponse(res, orderResult);
    } catch (err) {
        return helper.SendErrorResponse(err, res);
    }
});
router.put('/:id', async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(400).json({
          isSuccess: false,
          message: 'Invalid Request',
          data: errors
      });
    }
  
  try {
      // var updateRecord = req.query;
      var updateDetail = req.body;
      var updateResult = await services.updateProduct(updateDetail);
      return helper.SendResponse(res, updateResult);
  }
  catch (err) {
      return helper.SendErrorResponse(err, res);
  }
})
router.delete('/:id', async (req, res) => {
  
  try {
      var deleteRecord = req.query;
      var deleteResult = await services.DeleteProduct(deleteRecord);
      return helper.SendResponse(res, deleteResult);
  }
  catch (err) {
      return helper.SendErrorResponse(err, res);
  }
});


module.exports = router;
