const redis = require("redis")

console.log(process.env.REDIS_URL)
console.log(process.env.MONGODB_URL)

const client = redis.createClient(process.env.REDIS_URL)
var MongoClient = require('mongodb').MongoClient
var db

client.on("connect", function (error) {
    console.log('redis connected')


    MongoClient.connect(process.env.MONGODB_URL, { useUnifiedTopology: true }, function (err, _client) {
        if (err) throw err

        console.log('db connected')
        
        db = _client.db('voting')

        client.subscribe('VOTE')
        console.log('subscribed to VOTE...')

        client.on("message", function (channel, message) {
            console.log("Subscriber received message in channel '" + channel + "': " + message);

            // increment votes for type in databsae
            db.collection('votes').updateOne({type: message},{$inc: {votes: 1}})
            console.log('updated database')
        });
    })
});