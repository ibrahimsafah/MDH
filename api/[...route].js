import { createServer } from '../server/app.js'

const app = createServer()

export default function handler(req, res) {
  return app(req, res)
}
