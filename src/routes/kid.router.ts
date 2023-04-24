const express = require('express');
export const router = express.Router();
import bodyParser from 'body-parser';
import { createKidRequest, deleteKidRequest, editKidRequest, getKidRequest, getKidsRequest } from '../controllers/kid.controller';
const jsonParser = bodyParser.json();
import { verifyJWT } from '../middlewares';

router.use([jsonParser]);
router.get('/getAll', [verifyJWT], getKidsRequest);
router.get('/get', [verifyJWT], getKidRequest);
router.post('/add', [verifyJWT], createKidRequest);
router.put('/edit', [verifyJWT], editKidRequest);
router.delete('/delete', [verifyJWT], deleteKidRequest);
