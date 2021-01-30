import express from 'express';
import * as baseRoute from './index';

const router = express.Router();

router.post(`${baseRoute}/signin`, (req, res) => {
    res.send('Hi there');
});

export { router as signinRouter };