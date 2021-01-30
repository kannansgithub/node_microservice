import express from 'express';
import * as baseRoute from './index';

const router = express.Router();

router.post(`${baseRoute}/signout`, (req, res) => {
    res.send('Hi there');
});

export { router as signoutRouter };