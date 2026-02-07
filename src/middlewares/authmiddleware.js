import jwt from 'jsonwebtoken';

export const generateToken=(userData)=>{
const token = jwt.sign(userData, process.env.secret_key);
return token;
}