'use strict';
const mongoose=require('mongoose');
const stateSchema=mongoose.Schema({
    _id:{
        type:mongoose.Schema.ObjectId,
     
      },
      id:
      {
         type:Number,
        
      },
      name:
      {
         type:String,
         
      },
      country_id:
      {
          type:String,
       
      },
      country_code:
      {
          type:Number,
        
      },
      fips_code:
      {
          type:Number,
          
      },
      iso2:
      {
        type:String,
       
      },
      created_at:
      {
         type:Date,
        
      },
      updated_at:
      {
        type:Date,
        
      },
      flag:
      {
        type:Number,
       
      },
      wikiDateId:
      {
          type:mongoose.Mixed,
         
      },

});
module.exports = mongoose.model('state',stateSchema);