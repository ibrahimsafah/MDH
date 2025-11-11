import pg from 'pg'

const { Pool } = pg

const sslEnabled =
  process.env.PGSSLMODE === 'require' ||
  process.env.PGSSLMODE === 'prefer' ||
  process.env.PGSSL === 'true'

const pool =
  process.env.DATABASE_URL &&
  new Pool({
    connectionString: process.env.DATABASE_URL,
    ...(sslEnabled ? { ssl: { rejectUnauthorized: false } } : {}),
  })

if (pool) {
  pool.on('error', err => {
    console.error('[postgres] unexpected error on idle client', err)
  })
} else {
  console.warn('[postgres] DATABASE_URL not set. Database features are disabled.')
}

export const getPool = () => {
  if (!pool) {
    throw new Error('Postgres is not configured. Set DATABASE_URL to enable database access.')
  }
  return pool
}

export const query = async (text, params = []) => {
  const activePool = getPool()
  return activePool.query(text, params)
}

export const checkDatabaseHealth = async () => {
  if (!pool) {
    return { configured: false, healthy: false, message: 'DATABASE_URL not provided' }
  }

  try {
    const { rows } = await pool.query('select now() as now')
    return { configured: true, healthy: true, now: rows[0]?.now }
  } catch (error) {
    return { configured: true, healthy: false, message: error.message }
  }
}
