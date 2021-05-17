import mariadb from 'mariadb'
export const mariadbPoolConfig = {
  host: process.env.DATABASE_HOST,
  port: (process.env.DATABASE_PORT as unknown as number) || 3306,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  connectionLimit: 5,
}

const pool = mariadb.createPool(mariadbPoolConfig)

export const mariadbPool = {
  async connect() {
    return await pool.getConnection()
  },
}
