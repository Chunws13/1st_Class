const jwt = require("jsonwebtoken");

const generateToken = (req, res, next) => {
    const user = req.user; // User information obtained from the authentication process

    const user_id = user._id;
    const token = jwt.sign({ user_id }, "firstclass");

    res.locals.token = token;

    next();
};

const verifyToken = (req, res, next) => {
    const token = req.query.token;

    if (token && validateToken(token)) {
        req.user = {
            token: token,
        };
        next();
    } else {
        res.status(401).json({ error: "Unauthorized" });
    }
};

function validateToken(token) {
    try {
        const decoded = jwt.verify(token, "firstclass");
        const user_id = decoded.user_id;

        return true;
    } catch (error) {
        return false;
    }
}

module.exports = {
    generateToken,
    verifyToken,
};
