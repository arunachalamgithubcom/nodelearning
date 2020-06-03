const { Router } = require('express');
const router = new Router({ mergeParams: true });
const category=require('../models/categorization/category');
const subcategory=require('../models/categorization/subcategory');
router.post('/getcategory',function(req,res,next){
    category.find(function(err,category){
           if(category.length>0)
           {
                res.json({
                    success:true,
                    message:'data fetched successfully',
                    data:category,
                });
           }
           else
           {
                res.json({
                    success:false,
                    message:'No records found',
                    data:category,
                });
           }
    });
});
router.post('/getsubcategory',function(req,res,next){
   var query={category_id:req.body.id};
   subcategory.find(query,function(err,subcategory){
    if(category.length>0)
    {
         res.json({
             success:true,
             message:'data fetched successfully',
             data:subcategory,
         });
    }
    else
    {
         res.json({
             success:false,
             message:'No records found',
             data:subcategory,
         });
    }
});

});

module.exports = router;