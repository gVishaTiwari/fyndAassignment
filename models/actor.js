// /src/models/actor.js
const mongoose = require('mongoose');
const generateId = require('./plugins/generateId');
const actorSchema = new mongoose.Schema({ 
  id: {
    type: Number, 
    required: true, 
    index: {
      unique: true
    }
  },
  name: {
    type: String, 
    required: true
  }, 
  birth_year: {
    type: Number, 
    required: true

  }, 
  movies: [{
    type : mongoose.Schema.ObjectId,
    ref : 'Movie'
  }]
});
actorSchema.plugin(generateId());
 const Actor= mongoose.model('Actor', actorSchema);
 module.exports=Actor;