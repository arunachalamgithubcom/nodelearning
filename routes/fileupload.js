const { Router } = require('express');
const router = new Router({ mergeParams: true });
router.post('/fileupload', function(req, res, next) {   
    res.send('respond with a resource');
});
module.exports = router;