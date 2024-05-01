import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export async function Register( req, res ) {
    const { userName, userEmail, password } = req.body;

    try {
        const existUser = await User.findOne({ userName });

        if (existUser) {
            return res.status(400).json({ status: "Failed", message: "Username already exist" });
        }
        const hashpassword = await bcrypt.hash(password, 10);
        const newUser = new User({ userName, userEmail, password: hashpassword });
        await newUser.save();

        res.status(201).json({ status: "Success", message: "User registered successfully", data: newUser } );
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export async function Login( req, res ) {
    const { userName, password } = req.body;

    const user = await User.findOne({ userName });
    if (!user) {
        return res.status(401).json({ status: "Failed", message: "Invalid username or password" });
    }

    const validpassword = await bcrypt.compare( password, user.password );
    if (!validpassword) {
        return res.status(401).json({ status: "Failed", message: "Invalid username or password" });
    }

    const token = jwt.sign({ _id: user._id }, 'c1ab1847-32a0-4ea2-af4c-ae82a037e337', {expiresIn: "20m"});
    res.status(200).json({ status: "Success", message: "Successfully Logged In", data: {access_token: token, token_validity: "20m"} });

    // const Refreshtoken = jwt.sign({ _id: user._id }, 'c1ab1847-32a0-4ea2-af4c-ae82a037e337', {expiresIn: "5m"});
    // res.json({ Refreshtoken });
}