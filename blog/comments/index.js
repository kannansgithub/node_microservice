import express from 'express';
import bodyParser from 'body-parser';
import { randomBytes } from 'crypto';
import cors from 'cors';
import axios from 'axios';

const app = express();

app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', async (req, res) => {
    const id = randomBytes(4).toString('hex');
    const { content } = req.body;
    const comments = commentsByPostId[req.params.id] || [];
    comments.push({ id, content, status:'Pending' });
    commentsByPostId[req.params.id] = comments;
    await axios.post('http://event-bus-srv:4005/events', {
        type: 'CommentCreated',
        data: {
            id,
            content,
            postId: req.params.id,
            status:'Pending'
        }
    });
    res.status(201).send(comments);
   
});
app.post('/events',async (req, res) => {
    const { type, data } = req.body;
    if (type === 'CommentModerated') {
        const { postId, id, status, content } = data;
        const comments = commentsByPostId[postId];
        const comment = comments.find(com => { return com.id === id });
        comment.status = status;
        await axios.post('http://event-bus-srv:4005/events',{
            type: 'CommentUpdated',
            data: {
                id,
                status,
                postId,
                content
               }
        });
    }
    res.send({});
});
app.listen(4001, () => {
    console.log('Comments service is listening on PORT 4001');
});
