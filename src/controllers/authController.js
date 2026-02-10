import { createUser, getUserByEmail } from "../models/userModel.js";
import bcrypt from 'bcrypt';
import { generateToken } from "../middlewares/authmiddleware.js";

export const userRegister = async (req, res) => {
    const { firstname, lastname, email, password, confirm_password } = req.body;
    const hashed_password = await bcrypt.hash(password, 10);
    try {
        const user = await createUser(firstname, lastname, email, hashed_password);
        return res.status(200).json({ success: true, message: "user created successfully" });
    } catch (err) {
        return res.status(400).json({ success: false, message: "error from database" });
    }
};

export const userLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await getUserByEmail(email);
        if (!user) {
            return res.status(400).json({ success: false, message: "user does not exist" });
        }
        const match = bcrypt.compare(password, user.hashed_password);
        if (!match) {
            return res.status(400).json({ success: false, message: "incorrect password" });
        }
        const token = generateToken({
            id: user.id
        });
        const maxAge =3* 24 * 60 * 60;
        console.log(token);
        res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: maxAge * 1000
        });
        res.json({success: true, message: "login succesful"});

    } catch (err) {
        return res.status(400).json({ success: false, message: err.message });
    }

};