const mongoose = require('mongoose');

//connect to the database

mongoose.connect(`mongodb://localhost/Fynd`);

//acquire the connection(to check if it successfull)
const db = mongoose.connection;

//err
db.on('error',console.error.bind(console,"Error connecting  to mongodb"));

//up and running the print the message
db.once('open',function(){
    console.log('successfully connected to the database');
});

module.exports = db;