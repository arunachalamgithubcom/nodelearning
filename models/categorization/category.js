'use strict';
const mongoose=require('mongoose');
const categorySchema=mongoose.Schema({
    category_id:{
      type:Number,
      required:true
    },
    category:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('category',categorySchema,'category');