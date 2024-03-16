const JWT = require('jsonwebtoken');
exports.authenticate = async(req, res, next) => {
    try {
        if(!req.cookies.token){
            return res.status(400).send({ type: 'error', msg: 'Please first login'});
        }
        
        let result = JWT.verify(req.cookies.token, process.env.SECRET);
        if(!result){
            return res.status(400).send({ type: 'error', msg: 'Invalid token'});
        }

        next();

    } catch (error) {
        console.log(error);
        return res.status(500).send({ type: 'error', msg: 'Internal server error'});
    }
}