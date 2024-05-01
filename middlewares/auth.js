import jwt from "jsonwebtoken";

const checkToken = ( req, res, next ) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[ 1 ];
    console.log(token);

    if (!token) {
        return res.status(401).json({ message: "Access denied. Your token is required"});
    }

    try {
        const decoded = jwt.verify( token, 'c1ab1847-32a0-4ea2-af4c-ae82a037e337');
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: "The token entered is invalid" });
    }
};

export default checkToken;