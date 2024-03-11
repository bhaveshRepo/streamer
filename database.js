const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');
const uri = `mongodb+srv://bhaveshRepo:${process.env.MONGOKEY}@experiment.r4zir2i.mongodb.net/?retryWrites=true&w=majority&appName=experiment`

// const client = new MongoClient(uri, { maxPoolSize: 10, minPoolSize: 1});
const client = mongoose.createConnection(uri, {dbName: 'streamer', maxPoolSize: 10, minPoolSize: 1});

client.on('connected', () => {
    console.log("[#] Connected to the database .....")});

module.exports = client;