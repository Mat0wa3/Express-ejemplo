import db from './db.js'
import bcrypt from 'bcrypt'
import { SALT } from '../config.js'

export const findUserByEmail = async (email) => {
    const [rows] = await db.query(
        `SELECT BIN_TO_UUID(id_user) id_user, name, email, pass FROM users WHERE email = "${email}" OR name = "${email}"`
    )
    return rows[0]
}

export const createUser = async (input) => {
    const { name, last_name, email, password } = input
    if (password.length < 6) throw new Error("Password must be at least 6 characters long.")
    
    const userExists = await findUserByEmail(email)
    if (userExists) throw new Error("user already exists.")
    
    const [uuidResult] = await db.query("SELECT UUID() id_user")
    const [{ id_user }] = uuidResult
    
    const hashedPassword = await bcrypt.hash(password, SALT)
    
    await db.query(
        `INSERT INTO users (id_user, name, last_name, email, id_role, pass) 
        VALUES (UUID_TO_BIN("${id_user}"), ?, ?, ?, 1, ?)`, 
        [name, last_name, email, hashedPassword]
    )
    
    const [user] = await db.query(
        `SELECT BIN_TO_UUID(id_user) id_user FROM users WHERE id_user = UUID_TO_BIN(?)`,
        [id_user]
    )
    
    return { user }
}

export const getAllUsers = async ({ role }) => {
    if (role) {
        const [users] = await db.query(
            `SELECT BIN_TO_UUID(u.id_user) id, u.name, u.email, r.name role
            FROM users u
            LEFT JOIN roles r ON u.id_role = r.id_role
            WHERE u.id_role = ?`,
            [role]
        )
        return { users }
    }

    const [users] = await db.query(
        `SELECT BIN_TO_UUID(u.id_user) id, u.name, u.last_name, u.email, r.name role
        FROM users u
        LEFT JOIN roles r ON u.id_role = r.id_role`
    )

    return { users }
}

export const getUserById = async ({ id }) => {
    const [result] = await db.query(
        `SELECT BIN_TO_UUID(u.id_user) id, u.name, u.last_name, u.email, r.id_role role
        FROM users u
        LEFT JOIN roles r ON u.id_role = r.id_role
        WHERE u.id_user = UUID_TO_BIN(?)`,
        [id]
    )

    return result[0]
}

export const deleteUser = async ({ id }) => {
    await db.query(`DELETE FROM users WHERE id_user = UUID_TO_BIN(?)`, [id])
    return { message: "User deleted" }
}

export const updateUser = async ({ id, input }) => {
    const { name, last_name, email, role } = input

    await db.query(
        `UPDATE users SET name = ?, last_name = ?, email = ?, id_role = ?
        WHERE id_user = UUID_TO_BIN(?)`,
        [name, last_name, email, role, id]
    )

    const [updatedUser] = await db.query(
        `SELECT BIN_TO_UUID(id_user) id_user FROM users WHERE id_user = UUID_TO_BIN(?)`,
        [id]
    )

    return { updatedUser }
}