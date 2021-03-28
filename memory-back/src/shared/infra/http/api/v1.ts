import express from 'express';
import { memoryRouter } from '../../../../modules/memory/infra/http/routes';

// Import routes

const v1Router = express.Router();

v1Router.get('/ping', (req, res) => {
    return res.json("pong");
})

v1Router.use('/memory', memoryRouter);

export { v1Router }