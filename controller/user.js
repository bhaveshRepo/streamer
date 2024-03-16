const User = require("../schema/user");
const JWT = require("jsonwebtoken");
const { validationResult } = require("express-validator")
/**
 * 
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 * @returns {Express.Response}
 */
async function signUp(req, res){
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).send({ type: 'error', msg: errors.array()})
        }
    
        const user = new User(req.body);
    
        let result = await user.save().catch(err => {
            if(err.code == "11000"){
                throw new Error("Email already exists");
            } else {
                throw new Error('Database error');
            }
        })
    
        return res.status(200).send({ type: 'success', msg: 'user created', result});
    } catch(error){
        return res.status(400).send({ type: 'error', msg: error.message});
    }
}
/**
 * 
 * @typedef {object} body
 * @property {string} email
 * @property {string} password
 * 
 * @param {Express.Request} req  
 * @param {Express.Response} res
 * 
 * @param {body} req.body  
 */
async function signIn(req, res){
    try{
        let { email, password } = req.body;
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).send({ type: 'error', msg: errors.array()});
        }

        let result = await User.findOne({ email: email }).catch(err => {
            console.log(err);
            throw new Error("Database Error");
        })

        if(!result.authenticate(password)){
            return res.status(200).send({ type: 'error', msg: "Invalid email or password"});
        }

        let token = JWT.sign({_id: result._id}, process.env.SECRET, { expiresIn: '10h'});
        res.cookie("token", token);

        return res.status(200).send({ type: 'success', msg: 'User exists', data: result});
    }catch(error){
        console.log(error);
        return res.status(400).send({ type: 'error', msg: error.message});
    }
}

/**
 * 
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 * @returns {Express.Response}
 */
async function signOut (req, res){
    try{
        if(!req.cookies.token){
            return res.status(200).send({ type: 'error', msg: "First login to logout"});
        } 

        res.clearCookie("token");
        return res.status(200).send({ type: 'success', msg: "User logged out successfully"});
    } catch(error){
        console.log(error);
        return res.status(500).send({ type: 'error', msg: 'Internal server error'});
    }
}

module.exports = { signUp, signIn, signOut}