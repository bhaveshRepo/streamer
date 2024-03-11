const route = require("express").Router();
const User = require("./schema/user");
const client = require("./database");

route.get("/", async(req, res) => {
    try{
        let user = new User({ username: "Vishal Suthar"});
        client.collection("User").insertOne(user).then((result) => {
            console.log(result);
            return res.status(200).send({type: 'success', msg: "databaset setup completed successfully"});
        }).catch((err) => {
            console.log(err);
            return res.status(400).send({type: 'error', msg: "unable to create user"});
        })
    } catch(error) {
        console.log(error);
        return res.status(500).send({ type: 'error', msg: 'Internal server error'});
    }
});

module.exports = route;
