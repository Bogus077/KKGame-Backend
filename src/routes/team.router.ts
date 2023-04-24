const express = require('express');
export const router = express.Router();
import bodyParser from 'body-parser';
import { createTeamsRequest, getTeamsRequest } from '../controllers/team.controller';
const jsonParser = bodyParser.json();
import { verifyJWT } from '../middlewares';

router.use([jsonParser]);
router.get('/get', [verifyJWT], getTeamsRequest);
router.post('/add', [verifyJWT], createTeamsRequest);

