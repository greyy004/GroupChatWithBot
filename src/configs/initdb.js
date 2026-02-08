import { createUserTable } from '../models/userModel.js';
export const initdb = async ()=>{
    try {
        await createUserTable();
        console.log("created tables successfully");
    }catch( err)
    {
        console.log("error creating tables");
    }
};
