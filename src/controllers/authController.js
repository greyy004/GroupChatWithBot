import { createUser} from "../models/userModel";
import {bcrypt} from 'bcrypt';

export const userRegister=async(req, res)=>{
    const{ firstname, lastname, email, password, confirm_password } = req.body;
    const hashed_password= await bcrypt.hash(password, hashed_password);
    try {
        const user= await createUser(firstname, lastname, email, hashed_password);
        return res.status(200).json({success: true, message: "user created successfully"});
    }catch(err){
        return res.status(400).json({success: false, message: "error from database"});
    }
};

export const userLogin = async(req, res)=>{

};