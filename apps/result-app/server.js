const express = require('express')
const app = express()
const port = 9002
var MongoClient = require('mongodb').MongoClient
var db

const path = require("path")

console.log(__dirname, process.env.PORT, process.env.MONGODB_URL)

app.use(express.static(path.join(__dirname, "public"), {
    maxAge: 86400000
}))

app.get('/result', (req, res) => {
    db.collection('votes').find().toArray(function (err, result) {
        if (err) throw err

        res.send({ code: 0, result })
    })
})
app.get("*", (req, res) => res.sendFile(__dirname + '/public/index.html'));

MongoClient.connect(process.env.MONGODB_URL, { useUnifiedTopology: true }, function (err, _client) {
    if (err) throw err
    db = _client.db('voting')
    app.listen(process.env.PORT, () => {
        console.log('result app started')
    })
})

