

const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({ 
  
    Email:{
      type:String,
      unique:true
    },
    name:{
      type:String
    },
    password:
      {
        type:String
      },
    profile:{
      type:String
    }

  });
  

 const User = mongoose.model('User', userSchema);

  module.exports= User;