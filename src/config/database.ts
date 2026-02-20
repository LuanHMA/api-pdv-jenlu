import { createPool } from 'mysql2/promise'
import { env } from './env'

export const db = createPool({
    host: env.DB_HOST,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME
})