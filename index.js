const express = require('express')
const app = express()
const PORT = 1337

require('./routes/index.js')(app) 

app.listen(PORT,() => {
    console.log(`Server running on port ${PORT}`)
})
