const route = require('express').Router();
const multer = require('multer');
const { check } = require('express-validator');
const { signUp, signIn, signOut } = require('../controller/user');

const upload = multer({ dest: "uploads/"});
let signup_validation = [ 
    check('email', "Enter correct email").isEmail(), 
    check('firstName', "Field can't be Empty").notEmpty(),
    check('lastName', "Field can't be Empty").notEmpty(),
    check('password', "Minimum 8 character").isLength({ min: 8})
]
let signin_validation = [ 
    check('email', "Enter correct email").isEmail(),
    check('password', "Minimum 8 character").isLength({ min: 8})
]


route.post("/signup", upload.none(), signup_validation, signUp);
route.post("/signin", upload.none(), signin_validation, signIn);
route.get("/signout", signOut);

module.exports = route;