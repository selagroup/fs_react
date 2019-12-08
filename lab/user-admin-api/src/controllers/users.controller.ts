import { UserDao } from '@daos';
import { logger } from '@shared';
import { Request, Response } from 'express';
import { BAD_REQUEST, CREATED, OK } from 'http-status-codes';
import { paramMissingError } from '@shared';
import { ApiResponse } from '@shared';
import createHttpError = require('http-errors');


const userDao = new UserDao();

export const getUser = async (req: Request, res: Response) => {
    try {
        const users = await userDao.getAll();
        return res.send( ApiResponse.OK(users) );
    } catch (err) {
       throw createHttpError(BAD_REQUEST);
    }
};

export const createUser = async (req: Request, res: Response) => {
    try {
        const { user } = req.body;
        if (!user) {
            return res.status(BAD_REQUEST).json({
                error: paramMissingError,
            });
        }
        await userDao.add(user);
        res.send(ApiResponse.OK(user));
    } catch (err) {
        throw createHttpError(BAD_REQUEST);
    }
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        const user  = req.body;
        if (!user) {
            return res.status(BAD_REQUEST).json({
                error: paramMissingError,
            });
        }
        user.id = Number(user.id);
        await userDao.update(user);
        return res.send(ApiResponse.OK(user));
    } catch (err) {
        logger.error(err.message, err);
        return res.status(BAD_REQUEST).json({
            error: err.message,
        });
    }
};
