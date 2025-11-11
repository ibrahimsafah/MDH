import path from 'node:path'
import { fileURLToPath } from 'node:url'
import express from 'express'
import cors from 'cors'
import { estimatorConfig } from './data/estimator.js'
import { checkDatabaseHealth, query } from './lib/db.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distPath = path.resolve(__dirname, '../dist')

export function createServer() {
  const app = express()

  app.use(cors())
  app.use(express.json())

  app.get('/api/health', async (_req, res) => {
    const database = await checkDatabaseHealth()
    res.json({ status: 'ok', database })
  })

  app.get('/api/estimator/config', (_req, res) => {
    res.json(estimatorConfig)
  })

  app.get('/api/db/time', async (_req, res) => {
    try {
      const { rows } = await query('select now() as now')
      res.json({ now: rows[0]?.now })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  })

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(distPath))
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'))
    })
  } else {
    app.use((req, res, next) => {
      if (req.path.startsWith('/api')) {
        return res.status(404).json({ error: `Route ${req.originalUrl} not found` })
      }
      return next()
    })
  }

  return app
}
