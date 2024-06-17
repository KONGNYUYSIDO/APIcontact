import crypto from "crypto";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import User from "../models/userModel.js";


/**
 * Handles user registration by checking if the username already exists, hashing the password,
 * creating a new user, and saving it to the database.
 * @param {Object} req - The request object containing userName, userEmail, and password.
 * @param {Object} res - The response object used to send back the HTTP response.
 * @returns {Promise} A promise that resolves with the response data.
 */
export async function Register( req, res ) {
    const { userName, userEmail, password } = req.body;

    try {
        const existUser = await User.findOne({ userName });

        if (existUser) {
            return res.status(404).json({ status: "Failed", message: "Username already exist" });
        }
        const hashpassword = await bcrypt.hash(password, 10);
        const newUser = new User({ userName, userEmail, password: hashpassword });
        // if (req.file) {
        //     newUser.avatar = req.file.path
        // }
        await newUser.save();

        res.status(201).json({ status: "Success", message: "User registered successfully", data: newUser } );
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}



/**
 * Handles user authentication by verifying the provided username and password.
 * If valid, generates a JWT token for the user.
 * @param {Object} req - The request object containing userName and password in the body.
 * @param {Object} res - The response object used to send back the HTTP response.
 */
export async function Login( req, res ) {
    const { userName, password } = req.body;

    const user = await User.findOne({ userName });
    if (!user) {
        return res.status(404).json({ status: "Failed", message: "Invalid username or password" });
    }

    const validpassword = await bcrypt.compare( password, user.password );
    if (!validpassword) {
        return res.status(404).json({ status: "Failed", message: "Invalid username or password" });
    }

    const token = jwt.sign({ _id: user._id }, 'c1ab1847-32a0-4ea2-af4c-ae82a037e337', {expiresIn: "20m"});
    res.status(200).json({ status: "Success", message: "Successfully Logged In", data: {access_token: token, token_validity: "20m"} });

    // const Refreshtoken = jwt.sign({ _id: user._id }, 'c1ab1847-32a0-4ea2-af4c-ae82a037e337', {expiresIn: "5m"});
    // res.json({ Refreshtoken });
}



/**
 * Handles the process of resetting a user's password by verifying the user's email, generating a JWT token for password reset,
 * and sending an email with a reset link to the user.
 * 
 * @param {Object} req - The request object containing the user's email in the body.
 * @param {Object} res - The response object used to send back the HTTP response.
 */
export async function forgotPassword ( req, res ) {
    // Get user based on posted email
    const { userEmail } = req.body;
    //Verifying if the email exists in the db
    const user = await User.findOne( { userEmail: new RegExp( userEmail, "i") } );
    if (!user) {
        return res.status( 404 ).json( { status: "Failed", message: "This email does not exist" } );
    }
    
    // let resetToken = crypto.randomBytes(32).toString("hex");

    // const hash = await bcrypt.hash(resetToken, 10 );
  
    try {

        // Generate a random reset token
        const payload = {
            userEmail: user.userEmail
        }
        const expiryTime = 300;
        const resetToken = jwt.sign( payload, process.env.JWT_SECRET_KEY, { expiresIn: expiryTime } );

        // const newToken = new userToken( {
        //     userId: user._id,
        //     token: resetToken,
        //     createdAt: Date.now(),
        // }).save();

        const mailTransporter = nodemailer.createTransport( {
            service: "Gmail",
            auth: {
                user: "kongnyuyversi24@gmail.com",
                pass: "pmpbxlteqnqovirf"
            }
        });
        let mailDetails = {
            from: "Ntec@gmail.com",
            to: userEmail,
            subject: "Reset Password",
            html: `
            <!DOCTYPE html>
            <html lang="en">
                <head>
                    <title> Password Reset Request </title>
                </head>
                <body>
                    <h1> Password Reset Request </h1>
                    <p> Dear ${ user.userName }, </p>
                    <p> We received a request to reset your password for your account. To complete the password reset procedure, please click on the button below : </p>
                    <a href= ${ process.env.LIVE_URL }/reset/${ resetToken } ><button style = "background-color: #4CAF50; color: white; padding: 14px 20px; border: none; cursor: pointer; border-radius: 4px;"> Reset Password </button></a>
                    <p><b><u> NOTE: ${ resetToken } </u></b></p>
                    <p> This link is valid just for 5 minutes. If you did not request a password reset, please disregard this message </p>
                    <p> Thank you </p>
    
                </body>
            </html>
            `
        };
    
        const info = await mailTransporter.sendMail(mailDetails);
            console.log('Email sent: ' + info.response);
            res.status( 200 ).json( { status: "success", message: "Email sent successfully" } );
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ status: "Failed", message: "Error: Something went wrong. Please try again." } );
    }
}


/**
 * Handles the process of resetting a user's password.
 * It verifies the provided token, checks if the user exists, hashes the new password,
 * updates the user's password in the database, and returns a success or error message.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
export async function resetpassword ( req, res ) {

    try {
        //getting the token from the params
        const { token } = req.params;

        //getting the new password from the body
        const { password } = req.body;

        
        if ( !password ) {
            return res.status( 404 ).json( { message: "Please enter your password" } )
        }

        const decode = jwt.verify( token, process.env.JWT_SECRET_KEY )

        const user = await User.findOne( { userEmail: decode.userEmail } )

        //to check if the user object exists in the database before setting the new password to it
        if (!user) {
            return res.status( 404 ).json( { message: "User not found" } );
        }

        const newhashpass = await bcrypt.hash( password, 10 );

        user.password = newhashpass;

        await user.save();

        User.findByIdAndUpdate( { _id: User._id }, { $set: User }, { new: true } );

        return res.status( 200 ).json( { message: "Password reset successfully" } );
    } catch (error) {
        console.log( error );
        return res.status( 500 ).json( { message: error.message, status: "Something went wrong" } );
    }   
        
}