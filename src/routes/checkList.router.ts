const express = require('express');
export const router = express.Router();
import bodyParser from 'body-parser';
import { createCheckListRequest, getAllCheckListsRequest } from '../controllers/checklist.controller';
const jsonParser = bodyParser.json();
import { verifyJWT } from '../middlewares';

router.use([jsonParser]);
router.put('/create', [verifyJWT], createCheckListRequest);
router.get('/getAll', [verifyJWT], getAllCheckListsRequest);

