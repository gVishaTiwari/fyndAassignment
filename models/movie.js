// /src/models/movies.js
// const generateId = require('./plugins')
const mongoose = require('mongoose');
const movieSchema = new mongoose.Schema({ 
    // id: {
    //   type: Number, 
    //   required: true, 
    //   index: {
    //     unique: true
    //   }
    // }, 
    // title: {
    //   type: String, 
    //   required: true
    //  }, 
    //  year: {
    //    type: Number, 
    //    required: true
    //  }, 
    //  actors: [{
    //    type : mongoose.Schema.ObjectId, 
    //    ref : 'Actor'
    //  }]
    "99popularity":{
      type:Number
    },
    director:{
      type:String
    },
    genre:[
      {
        type:String
      }
    ],
    imdb_score:{
      type:Number
    },
    name:{
      type:String
    }

  });
  
  // movieSchema.plugin(generateId());

 const Movies = mongoose.model('Movie', movieSchema);

  module.exports= Movies ;