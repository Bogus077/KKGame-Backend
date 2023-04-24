'use strict';

import express, { Application, Request, response, Response } from 'express'
import { router as UserRouter } from "./routes/user.router";
import { router as AuthRouter } from './routes/auth.router';
import { router as TeamRouter } from './routes/team.router';
import { router as KidRouter } from './routes/kid.router';
import { serverConfig } from './config/config';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger-output.json';
import cors from 'cors';
const app = express();
import http from 'http';
const server = http.createServer(app);
import { Server, Socket } from "socket.io";
const io = new Server(server, {
  cors: {
    origin: '*'
  }
});

// app.use(tokenValidation);
app.use(cors());
app.use('/user', UserRouter);
app.use('/auth', AuthRouter);
app.use('/team', TeamRouter);
app.use('/kid', KidRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get('/swagger', (request, response) => response.send(swaggerDocument));
app.get('/', (request, response) => {
  response.send('Hello, Hackerman! Welcome to KKBackend');
});

server.listen(serverConfig);

console.log(`App started on ${serverConfig.port}`);
