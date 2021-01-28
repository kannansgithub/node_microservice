import express from 'express';
import bodyParser from 'body-parser';
import { randomBytes } from 'crypto';
import cors from 'cors';
import axios from 'axios';

const app = express();

app.use(bodyParser.json());
app.use(cors());


const posts = {};

app.get('/posts', (_, res) => { 
    res.send(posts);
});

app.post('/posts/create', async (req, res) => {
    const id = randomBytes(4).toString('hex');
    const { title } = req.body;
    console.log('Requested value :', title);
    posts[id] = { id, title };
    await axios.post('http://event-bus-srv:4005/events', {
        type: 'PostCreated',
        data: {
            id,
            title
        }
    });
    res.status(201).send(posts[id]);
 });
app.post('/events', (req, res) => {
    console.log('Event received');
    res.send({});
});
app.listen(4000, () => {
    console.log('Post service is listening on PORT 4000'); 
});
