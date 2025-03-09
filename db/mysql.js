import mysql from "mysql2/promise";
import { SALT } from "../config.js"
import bcrypt from "bcrypt"

const config = {
  host: "localhost",
  user: "root",
  database: "agendadb",
};

const connection = await mysql.createConnection(config);

export class UserModel {
  static async getAll({ role }) {
    if (role) {
      const [result] = await connection.query(
        `SELECT BIN_TO_UUID(u.id_user) ID, u.name, u.last_name, u.email, r.name role
        FROM users u
        LEFT JOIN roles r ON u.id_role = r.id_role
        WHERE u.id_role = ?`,
        [role]
      )

      return {result}
    }

    const [result] = await connection.query(
      `SELECT BIN_TO_UUID(u.id_user) ID, u.name, u.last_name, u.email, r.name role
      FROM users u
      LEFT JOIN roles r ON u.id_role = r.id_role`
    )

    return {result}
  }

  static async getById({ id }) {
    const [result] = await connection.query(
      `SELECT BIN_TO_UUID(u.id_user) ID, u.name, u.last_name, u.email, r.name role
      FROM users u
      LEFT JOIN roles r ON u.id_role = r.id_role
      WHERE id_user = UUID_TO_BIN(?)`,
      [id]
    )

    if (!result[0]) throw new Error('User not found')

    return {result}
  }

  static async create( input ) {
    const { name, last_name, email, password } = input;

    if (typeof password !== 'string') throw new Error('Password must be a string.')
    if (password.length < 6) throw new Error('Password must be at least 6 characters long.')
    
    // validar si el usuario ya existe
    const [result] = await connection.query('SELECT email FROM users WHERE email = ?', [email])
    if (result[0]) throw new Error('user already exists.')

    const [uuidResult] = await connection.query('SELECT UUID() id_user;')
    const [{ id_user }] = uuidResult

    const hashedPassword = await bcrypt.hash(password, SALT)

    try {
      await connection.query(
        `INSERT INTO users (id_user, name, last_name, email, id_role, pass) 
        VALUES (UUID_TO_BIN("${id_user}"), ?, ?, ?, 1, ?);`, 
        [name, last_name, email, hashedPassword]
      )
    } catch (error) {
      return new Error('Error trying to create the user')
    }

    const [user] = await connection.query(
      `SELECT BIN_TO_UUID(id_user) id_user FROM users WHERE id_user = UUID_TO_BIN(?)`,
      [id_user]
    )

    return {user}
  }

  static async login({ username, password }) {

    const [query] = await connection.query(`SELECT BIN_TO_UUID(id_user) ID, name, email, id_role, pass FROM users WHERE name = "${username}" OR email = "${username}"`)
    const user = query[0]
    if (!user) throw new Error('user does not exists')

    const isValid = await bcrypt.compare(password, user.pass)
    if (!isValid) throw new Error('password is invalid')

    return {
      id: user.ID,
      name: user.name,
      email: user.email,
      role: user.id_role
    }
  }

  static async delete({ id }) {
    try {
      await connection.query(`DELETE FROM users WHERE id_user = UUID_TO_BIN(?)`, [id])
    } catch (error) {
      return { message: 'Could not delete the user' }
    }

    return { message: 'User deleted' }
  }

  static async update({ id, input }) {
    const {
      name,
      last_name,
      email,
      id_role,
      password
    } = input

    const hashedPassword = await bcrypt.hash(password, SALT)

    try {
      await connection.query(
        `UPDATE users SET name = ?, last_name = ?, email = ?, id_role = ?, pass = ?
        WHERE id_user = UUID_TO_BIN(?)`,
        [name, last_name, email, id_role, hashedPassword, id]
      )
    } catch (error) {
      return { message: 'Could not update the user' }
    }
    
    const [updatedUser] = await connection.query(
      `SELECT BIN_TO_UUID(u.id_user) ID, u.name, u.last_name,u. email, r.name role, u.pass
      FROM users u
      LEFT JOIN roles r ON u.id_role = r.id_role
      WHERE id_user = UUID_TO_BIN('${id}')`
    )

    return {updatedUser}
  }
}


export class AgendaModel {
  static async getAll({ userID }) {
    if (userID) {
      const [result] = await connection.query(
        `SELECT d.id_date, d.day, d.time, d.description, u.name cliente, o.name empleado
        FROM dates d 
        LEFT JOIN users u ON d.id_client = u.id_user
        LEFT JOIN users o ON d.id_employe = o.id_user
        WHERE d.id_client = UUID_TO_BIN("${userID}") OR d.id_employe = UUID_TO_BIN("${userID}")`
      )

      return {result}
    }

    const [result] = await connection.query(
      `SELECT d.id_date, d.day, d.time, d.description, u.name cliente, o.name empleado
      FROM dates d 
      LEFT JOIN users u ON d.id_client = u.id_user
      LEFT JOIN users o ON d.id_employe = o.id_user`
    )

    return {result}
  }

  static async getById({ id }) {
    const [result] = await connection.query(
      `SELECT d.id_date, d.day, d.time, d.description, u.name cliente, o.name empleado
      FROM dates d 
      LEFT JOIN users u ON d.id_client = u.id_user
      LEFT JOIN users o ON d.id_employe = o.id_user
      WHERE d.id_date = ?`,
      [id]
    )

    if (!result[0]) throw new Error('Date not found')

    return {result}
  }

  static async create({ input }) {
    const {
      day, 
      time, 
      description, 
      id_client, 
      id_employe 
    } = input

    try {
      await connection.query(
        `INSERT INTO dates (day, time, description, id_client, id_employe)
        VALUES (?, ?, ?, UUID_TO_BIN("${id_client}"), UUID_TO_BIN("${id_employe}"));`,
        [day, time, description]
      )
    } catch (error) {
      return new Error('Could not create the date, try again later.')
    }

    const [date_id] = await connection.query('SELECT MAX(id_date) id FROM dates;')

    return {date_id}

  }

  static async delete({ id }) {
    try {
      await connection.query('DELETE FROM dates WHERE id_date = ?', [id])
    } catch (error) {
      return new Error('Could not delete the date')
    }

    return {id}
  }

  static async update({ input }) {
    const {
      id,
      day,
      time,
      description,
      id_client,
      id_employe
    } = input

    try {
      await connection.query(
        `UPDATE dates SET day = ?, time = ?, description = ?, id_client = UUID_TO_BIN(?), id_employe = UUID_TO_BIN(?) WHERE id_date = ?`,
        [day, time, description, id_client, id_employe, id]
      )
    } catch (error) {
      return new Error('could not update the date')
    }

    const [updatedDate] = await connection.query('SELECT day, time, description, BIN_TO_UUID(id_client) id_client, BIN_TO_UUID(id_employe) id_employe FROM dates WHERE id_date = ?', [id])

    return {updatedDate}
  }
}