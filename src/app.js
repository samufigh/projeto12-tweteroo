import express from 'express';
import cors from 'cors';

const server = express();
server.use(cors());
server.listen(5000, () => console.log('Running on port 5000'));
server.use(express.json());


var users = [];
var tweets = [];

server.post("/tweets", (req, res) => {

    const request = req.body;
    if (users.length != 0){
        for (let i = 0; i < users.length; i++){
            if (users[i].username == request.username){

                const objeto = { 
                    username: request.username, 
                    avatar: users[i].avatar, 
                    tweet: request.tweet
                };
                
                tweets.push(objeto);
                res.send('OK');
                res.status(200);
                break;
            }
            else if ((i == users.length - 1 || i == users.length) && users[i].username != request.username){
                res.status(202);
                res.send('UNAUTHORIZED');
            }
        }
    }
    else{
        res.status(202);
        res.send('UNAUTHORIZED');
    }
})

server.post("/sign-up", (req, res) => {


    users.push(req.body);
    res.status(200);
    res.send('OK');
})

server.get('/tweets', (req, res) => {

    if (tweets.length <= 10){
        res.send(tweets);
        res.status(200);
    }

    else{
        let objeto = [];
        const total = tweets.length - 1;
        for(let a = 0; a < 10; a++){
            objeto.push( tweets[total - a] );
        }
        res.status(200);
        res.send(objeto);
    }
})
