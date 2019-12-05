import { Request, Response, NextFunction } from 'express';
import createHttpError from 'http-errors';
import * as httpStatus from 'http-status-codes';
import { MoviesDao } from '../daos/Movies/MoviesDao.mock';
import { ApiResponse } from '@shared';
const moviesDao = new MoviesDao();

export async function getMovies(req: Request, res: Response, next: NextFunction) {
    try {
        const data = await moviesDao.getAll();
        res.json( ApiResponse.OK(data) );

    } catch (error) {
        next( createHttpError( httpStatus.INTERNAL_SERVER_ERROR, 'unable to fetch movies' ) );
    }
}

export async function updateMovie(req: Request, res: Response, next: NextFunction) {
    try {
        const movie = req.body;
        await moviesDao.update(movie);
        res.json( ApiResponse.OK(movie) );

    } catch (error) {
        next( createHttpError( httpStatus.INTERNAL_SERVER_ERROR, 'unable to update movies' ) );
    }
}

export async function addMovie(req: Request, res: Response, next: NextFunction) {
    try {
        let movie = req.body;
        movie = await moviesDao.add(movie);
        res.json( ApiResponse.OK(movie) );

    } catch (error) {
        next( createHttpError( httpStatus.INTERNAL_SERVER_ERROR, 'unable to fetch movies' ) );
    }
}