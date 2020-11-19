var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('../config/auth.config'); // get our config file

const verifyToken = (req, res, next) => {
    var { authorization } = req.headers;
    if (!authorization){
        return res.status(400).send({ auth: false, message: 'No token provided.' });
    }
    const token = authorization.replace('Bearer ', '');

    jwt.verify(token, config.secret, function(err, decoded) {
        if (err) {
            return res.status(403).send({auth: false, message: 'Failed to authenticate token.'});
        }
        if (Date.now() >= decoded.exp*1000) {
            return res.status(403).send({auth: false, message: 'Token Expired'});
        }
        next();
    });
}

module.exports = verifyToken;
