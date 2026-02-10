import jwt from 'jsonwebtoken';
import {getUserByEmail } from '../models/userModel.js';

export const authRegister =async (req, res, next) => {
    const { firstname, lastname, email, password, confirm_password } = req.body;
    const nameRegex = /^[A-Za-z]{2,}$/;
    const emailRegex = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!firstname || !lastname || !email || !password || !confirm_password) {
        return res.status(400).json({ success: false, message: "All fields are required." });
    }

    if (!nameRegex.test(firstname)) {
        return res.status(400).json({ success: false, message: "Invalid first name." });
    }
    if (!nameRegex.test(lastname)) {
        return res.status(400).json({ success: false, message: "Invalid last name." });
    }

    if (!emailRegex.test(email)) {
        return res.status(400).json({ success: false, message: "Invalid email address." });
    }

    if (!passwordRegex.test(password)) {
        return res.status(400).json({ success: false, message: "Password must be at least 8 characters long and contain at least one letter and one number." });
    }

    if (password !== confirm_password) {
        return res.status(400).json({ success: false, message: "Passwords do not match." });
    }

    const existingUser= await getUserByEmail(email);
    if (existingUser){
        return res.status(400).json({ success: false, message: "user already exists."});
    }
    next();
}


export const authLogin = (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Please fill all the fields" });
    }
    if (!/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(email)) {
        return res.status(400).json({ message: "Please enter a valid email address." });
    }
    // Password validation
    if (password.length < 8) {
        return res.status(400).json({ message: "Password must be at least 8 characters." });
    }
    next();
}

export const generateToken = (userData) => {
    const token = jwt.sign(userData, process.env.secret_key);
    return token;
}

export const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    try {
        const decoded = jwt.verify(token, process.env.secret_key);
        req.user = decoded;
        next();
    } catch {
        res.status(401).json({ message: "Invalid token" });
    }
};
