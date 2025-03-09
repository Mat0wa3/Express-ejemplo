import db from './db.js'

export const create = async ({ input }) => {
    const { day, time, description, id_client, id_employe } = input

    const dateExists = getDateByEmploye({ id_employe, options: { day, time } })
    if (dateExists) throw new Error('Date already exists')

    return await db.query(
        `INSERT INTO dates (day, time, description, id_client, id_employe) 
        VALUES (?, ?, ?, UUID_TO_BIN(?), UUID_TO_BIN(?))`,
        [day, time, description, id_client, id_employe]
    )
}

export const update = async ({ id, input }) => {
    const { day, time, description, id_client, id_employe } = input

    await db.query(
        `UPDATE dates SET day = ?, time = ?, description = ?, id_client = UUID_TO_BIN(?), id_employe = UUID_TO_BIN(?) WHERE id_date = UUID_TO_BIN(?)`,
        [day, time, description, id_client, id_employe, id]
    )

    return { message: 'Date updated' }
}

export const remove = async ({ id }) => {
    await db.query(
        `DELETE FROM dates WHERE id_date = ?`,
        [id]
    )

    return { message: 'Date deleted' }
}

export const getAll = async () => {
    const [dates] = await db.query(
        `SELECT d.id_date id, DATE_FORMAT(d.day, '%d-%m-%y') day, d.time, d.description, u.name user, e.name employe 
        FROM dates d 
        LEFT JOIN users u ON d.id_client = u.id_user 
        LEFT JOIN users e ON d.id_employe = e.id_user`
    )

    return { dates }
}

export const getById = async ({ id_date }) => {
    const [date] = await db.query(
        `SELECT d.id_date id, DATE_FORMAT(d.day, '%d-%m-%y') day, d.time, d.description, u.name user, e.name employe 
        FROM dates d 
        LEFT JOIN users u ON d.id_client = u.id_user 
        LEFT JOIN users e ON d.id_employe = e.id_user 
        WHERE d.id_date = UUID_TO_BIN(?)`,
        [id_date]
    )

    return date[0]
}

export const getByEmploye = async ({ id_employe, options }) => {
    const { day, time } = options
    const [date] = await db.query(
        `SELECT * FROM dates WHERE id_employe = UUID_TO_BIN('?') AND day = ? AND time = ?`,
        [id_employe, day, time]
    )

    return date[0]
}