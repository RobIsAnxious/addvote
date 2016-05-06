import express from 'express'
import db from 'sequelize-connect'
import path from 'path'
import pollController from './controllers/pollController'
import bodyParser from 'body-parser'

async function connect () {
  db.discover = path.join(__dirname, 'models')
  db.matcher = function shouldIMportModel (modelFileName) {
    return true
  }
  await db.connect('addvote_schema', 'root', '')
}

(async function () {
  try {
    await connect()
  } catch (e) {
    console.log(`There was an error connecting: ${e}`)
  }
  const app = express()
  app.use(bodyParser.json())
  app.post('/api/poll', pollController.handlePost)

  const port = 3000
  app.listen(port, () => console.log(`Running on port ${port}`))
})()
