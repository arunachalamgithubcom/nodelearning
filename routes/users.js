const { Router } = require('express');
const router = new Router({ mergeParams: true });

/* GET users listing. */
router.post('/credentialverification', function(req, res, next) {

     res.send('respond with a resource');
});
router.post('/register', function(req, res, next) {

  res.send('respond with a resource');
});
router.post('/emailverification', function(req, res, next) {   
     res.send('respond with a resource');
});
router.post('/register', function(req, res, next) {   
     res.send('respond with a resource');
});
router.post('/login', function(req, res, next) {   
     res.send('respond with a resource');
});

module.exports = router;
