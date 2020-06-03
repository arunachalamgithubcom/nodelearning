const { Router } = require('express');
const rfqback = require('./rfqback');
const users = require('./users');
const category=require('./category');
const location=require('./geolocation');
const validation=require('./validation');
const fileupload=require('./fileupload');

const router = new Router({ mergeParams: true });

// category Api's
router.use('/categorization', category);

//geolocation Api's
router.use('/location',location);

//requestforquote Api's
router.use('/rfq',rfqback)

//Validation Api's
router.use('/validation',validation)

// User Api's
router.use('/users', users);

// fileupload Api's
router.use('/fileupload',fileupload);


module.exports = router;
