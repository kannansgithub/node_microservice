import express from 'express';
import { json } from 'body-parser';


const app = express();
app.use(json());


app.get('/api/users/current-user', (req, res) => {
    console.log('Request received ', req);
    res.send('Hi there!');
});


app.listen(3000, () => {
    console.log('Listening on PORT 3000!!!!');
});