const jwt = require('jsonwebtoken');

// Create Token
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;
    if(authHeader){
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SEC, (err, user) => {
            if(err) res.status(403).json('Token not Valid!');
            req.user = user;
            next();
        })
    } else {
        res.status(401).json('You are not authenticated!');
    }
};

// User and Admin Authorization
const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user.id === req.params.id || req.user.isAdmin){
            next();
        } else {
            res.status(403).json('You are not Authorized!');
        }
    });
};

// Admin Authorization
const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user.isAdmin){
            next();
        } else {
            res.status(403).json('You are not Authorized!');
        }
    });
};

module.exports = {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin}