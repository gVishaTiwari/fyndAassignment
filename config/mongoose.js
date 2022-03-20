const mongoose = require('mongoose');

//connect to the database

// mongoose.connect(`mongodb://localhost/Fynd`);
mongoose.connect(`mongodb+srv://gvishaltiwari:ii4prkjfKLy8IGJH@cluster34.lv75r.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`);

//acquire the connection(to check if it successfull)
const db = mongoose.connection;

//err
db.on('error',console.error.bind(console,"Error connecting  to mongodb"));

//up and running the print the message
db.once('open',function(){
    console.log('successfully connected to the database');
});

module.exports = db;