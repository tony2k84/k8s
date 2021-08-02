# docker
docker compose up

# mongo setup
docker run --name mongo -p 27017:27017 -d mongo
db.votes.deleteMany({})
db.votes.insertOne({type: 'CATS',votes: 0})
db.votes.insertOne({type: 'DOGS',votes: 0})

# k8s
## start minikube cluster
minikube start

