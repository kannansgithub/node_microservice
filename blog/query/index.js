import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';
import cors from 'cors';

const app = express();

app.use(bodyParser.json());
app.use(cors());

const posts = {};
const HandleEvents = (type, data) => {
    if (type === 'PostCreated') {
        const { id, title } = data;
        posts[id] = { id, title, comments: [] };
    }
    else if (type === 'CommentCreated') {
        const { id, content, postId, status } = data;
        const post = posts[postId] || [];
        post.comments.push({ id, content, status });
    }
    else if (type === 'CommentUpdated') {
        const { postId, id, status, content } = data;

        const post = posts[postId];
        const comment = post.comments.find(comment => { return comment.id === id });
        comment.status = status;
        comment.content = content;
    }
}
app.get('/posts', (req, res) => {
    res.send(posts);
});

app.post('/events', (req, res) => {
    const { type, data } = req.body;
    HandleEvents(type, data);
    res.send({});
});


app.listen(4002, async () => {
    console.log('Query service is listening on PORT 4002');
    const res = await axios.get('http://event-bus-srv:4005/events');
    for (let event of res.data) {
        console.log(`Event Received ${event.type}`);

        HandleEvents(event.type, event.data);
    }
});
