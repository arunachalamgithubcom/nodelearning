const { Router } = require('express');
const router = new Router({ mergeParams: true });
router.post('/verifyemail', function(req, res, next) {   
    res.send('respond with a resource');
});
router.post('/verifymobileno', function(req, res, next) {   
    res.send('respond with a resource');
});
router.post('/verifyoauth_id', function(req, res, next) {   
    res.send('respond with a resource');
});
router.post('/verify_referral_code', function(req, res, next) {   
    res.send('respond with a resource');
});
router.post('/verifycompanyname', function(req, res, next) {   
    res.send('respond with a resource');
});
router.post('/verifycompanyregno', function(req, res, next) {   
    res.send('respond with a resource');
});
module.exports = router;