const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    const token = res.header('Authorization').replace('Bearer', '');
    if (!token) {
        return res.status(401).json({
            message: 'No token, authorization denied'
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({
            message: 'Token is not valid'
        })
    }

}

module.exports = { verifyToken }