const mongoose = require('mongoose');
const uri = `mongodb+srv://bhaveshRepo:${process.env.MONGOKEY}@experiment.r4zir2i.mongodb.net/?retryWrites=true&w=majority&appName=experiment`

mongoose.connect(uri, { dbName: 'streamer'}).then(() => console.log("Connected")).catch((err) => console.log(err));

module.exports = mongoose.connection;