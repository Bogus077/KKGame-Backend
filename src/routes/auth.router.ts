const express = require('express');
export const router = express.Router();
import bodyParser from 'body-parser';
import {
  loginRequest,
  makeCallRequest,
  signUpRequest,
  useRefreshRequest,
} from '../controllers/auth.controller';
const jsonParser = bodyParser.json();
import { verifyJWTRefresh } from '../middlewares';

router.use([jsonParser]);

router.get('/refresh', [verifyJWTRefresh], useRefreshRequest);
router.put('/signUp', signUpRequest);
router.post('/login', loginRequest);
router.post('/makeCall', makeCallRequest);
