import express from 'express'

const app = express()

app.get('*', function(req, res) {
  res.send('hello')
})

const port = 8000
app.listen(port, () => console.log('Running on port ${port}'))