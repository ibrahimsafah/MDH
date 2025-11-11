import { createServer } from './app.js'

const PORT = process.env.API_PORT || process.env.PORT || 4000
const app = createServer()

app.listen(PORT, () => {
  console.log(`Maison du Hardscape API listening on port ${PORT}`)
})
