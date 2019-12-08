
import { UserDao } from '@daos';
import { logger } from '@shared';
import { Request, Response, Router, Express } from 'express';
import { BAD_REQUEST, CREATED, OK } from 'http-status-codes';
import { paramMissingError } from '@shared';
import { ParamsDictionary } from 'express-serve-static-core';
import * as UserController from '../controllers/users.controller';

// Init shared
const router = Router();
const userDao = new UserDao();

router.get('/', UserController.getUser  );
router.post('/', UserController.createUser );
router.put('/:id', UserController.updateUser);

export default router;
