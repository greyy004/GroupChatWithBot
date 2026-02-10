import path from 'path';
import { fileURLToPath } from 'url';
import { getUserById } from '../models/userModel.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getUserDashboard = (req, res) => {
    res.sendFile(
        path.join(__dirname, '../../public/html/index.html')
    );
};

export const getUsername = async (req, res)=>{
try {
    const data = await getUserById(req.user.id);
    if(!data)
    {
        return res.status(400).json({message: "cannot find the User Id"});
    }
    return res.status(200).json({
        firstname: data.firstname,
        lastname: data.lastname, 
        email: data.email
    })
}catch(err)
{
    return res.status(400).json({message: err.message});
}
};