import express from 'express';
import * as baseRoute from './index';

const router = express.Router();

router.get(`${baseRoute}/current-user`, (req,res) => {
    res.send('Hi there');
});

export { router as currentUserRouter };