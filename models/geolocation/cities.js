'use strict';
const mongoose=require('mongoose');
const citySchema=mongoose.Schema({
    _id:{
        type:mongoose.Schema.ObjectId,
        required:true,
      },
      id:
      {
         type:Number,
         required:true
      },
      name:
      {
         type:String,
         required:true,  
      },
      state_id:
      {
          type:String,
          required:true,
      },
      country_id:
      {
          type:Number,
          required:true,
      },
      country_code:
      {
          type:Number,
          required:true,
      },
      latitude:
      {
          type:Number, 
      },
      longitude:
      {
          type:Number
      },
      created_at:
      {
         type:Date,
         required:true
      },
      updated_at:
      {
        type:Date,
        required:true
      },
      flag:
      {
        type:Number,
        required:true
      },
      wikiDateId:
      {
          type:mongoose.Mixed,
          required:true,
      },
});
module.exports = mongoose.model('city',citySchema);