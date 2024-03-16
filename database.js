const mongoose = require('mongoose');
const uri = `mongodb+srv://bhaveshRepo:${process.env.MONGOKEY}@experiment.r4zir2i.mongodb.net/?retryWrites=true&w=majority&appName=experiment`

async function inititalize() {
    try {
        await mongoose.connect(uri, { dbName: 'streamer' }).then(() => console.log("Connected")).catch((err) => console.log(err));
    } catch (error) {
        console.log(error);
    }
}

inititalize();
module.exports = mongoose.connection;