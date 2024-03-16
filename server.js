const express = require('express');
require('dotenv').config();
const cookie_parser = require("cookie-parser");

const app = express();

const user = require("./routes/user");
const videos = require("./routes/video");
const client = require("./database");

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-origin", "http://localhost:3000");
    next();
});
app.use(cookie_parser());

app.use("/user", user);
app.use("/video", videos );

let arg_port = process.argv.slice(2);
let port = process.env.PORT || arg_port[0] || 3000;

process.on("SIGINT", async() => {
    try {
        console.log('Closing MongoDB connection');
        await client.close()
        console.log('MongoDB connection closed');
        process.exit(0);
    } catch (err) {
        console.error('Error closing MongoDB connection:', err);
        process.exit(1);
    }
})

app.listen(port, () => console.log("Server is listening on port: %s", port));
