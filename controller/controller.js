const express = require('express');
const router = express.Router();
const services = require('../service/service');
const helper = require('../lib/helper');
const { check, validationResult } = require('express-validator')



router.post('/', [
    check('productname').isLength({ min: 4, max: 7 }).withMessage('Product name must contain at least 4 characters'),
    check('brand').isLength({ min: 2 }).withMessage('Brand must contain at least 2 characters'),
    check('color').isLength({ min: 3 }).withMessage('Color must contain at least 3 characters'),
    check('price').isLength({ min: 1 }).withMessage('price must be specified'),

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
module.exports = router;
