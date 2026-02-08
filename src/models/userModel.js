import pool from '../configs/db.js';

export const createUserTable = async () => {
    const user = await pool.query(`
        create table if not exists users(
            id SERIAL PRIMARY KEY,
            firstname VARCHAR(50) NOT NULL,
            lastname VARCHAR(50) NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            hashed_password VARCHAR(255) NOT NULL
        )
        `);
    return user;
};


export const  createUser= async (firstname, lastname, email, hashed_password) => {
    const result = await pool.query(`
    insert into users (
        firstname, lastname, email, hashed_password) values ($1,$2,$3,$4)`,
        [firstname, lastname, email, hashed_password]);
    return result.rows[0];
};