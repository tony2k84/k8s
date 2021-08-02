const express = require('express')
const app = express()
const redis = require("redis")
const REDIS_URL = process.env.REDIS_URL
const client = redis.createClient(REDIS_URL)
const path = require("path")

console.log(__dirname, process.env.PORT, REDIS_URL)

app.use(express.static(path.join(__dirname, "public"), {
    maxAge: 86400000
}))

app.get('/vote/:type', (req, res) => {
    const { type } = req.params

    client.publish('VOTE', type)
    console.log('message published')
    res.send({ message: `VOTED: ${type} ` })
})

app.get("*", (req, res) => res.sendFile(__dirname + '/public/index.html'));

client.on("error", function (error) {
    console.error(error);
});

client.on("connect", function (error) {
    console.log('redis connected')

    app.listen(process.env.PORT, () => {
        console.log('voting app started')
    })
});

