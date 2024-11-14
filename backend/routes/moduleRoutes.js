const express = require('express');
const router = express.Router();
const  extractUserId  = require('../middleware/extractUserId'); // Correctly import the middleware
const { myModules,courseContent } = require('../controllers/moduleController'); // Correctly import the controller

// Define the route using the middleware and controller
router.get('/mymodules', extractUserId, myModules);  
router.get('/:uniqueCode', courseContent);  

module.exports = router;
