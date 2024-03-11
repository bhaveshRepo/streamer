const User = require("../schema/user");
// const client = require("../database");
const { validationResult } = require("express-validator")

async function signUp(req, res){
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            console.log(errors);
            return res.status(400).send({ type: 'error', msg: errors.array()})
        }
    
        const user = new User(req.body);
    
        let result = await user.save().catch(err => {
            err.from = "mongo_schema";
            throw err;
        })
    
        console.log(result);
    
        return res.status(200).send({ type: 'success', msg: 'user created', result});
    } catch(error){
        if(error.from == "mongo_schema"){
            console.log(error.keyPattern);
            return res.status(400).send({ type: 'error', msg: "from Schema"})
        } 
        
        return res.status(400).send({ type: 'error', msg: "From outer block"})
    }
}

function signIn(req, res){
    User.findOne()
}

module.exports = { signUp, signIn }