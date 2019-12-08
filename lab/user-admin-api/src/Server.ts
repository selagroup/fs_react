import cookieParser from 'cookie-parser';
import express, { NextFunction } from 'express';
import { Request, Response } from 'express';
import logger from 'morgan';
import path from 'path';
import BaseRouter from './routes';
import cors from 'cors';
import createHttpError, { HttpError } from 'http-errors';
import { ApiResponse } from '@shared';
import { NOT_FOUND } from 'http-status-codes';
// Init express
const app = express();

// Add middleware/settings/routes to express.
app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', BaseRouter);

/**
 * Point express to the 'views' directory. If you're using a
 * single-page-application framework like react or angular
 * which has its own development server, you might want to
 * configure this to only serve the index file while in
 * production mode.
 */
const viewsDir = path.join(__dirname, 'views');
app.set('views', viewsDir);
const staticDir = path.join(__dirname, 'public');
app.use(express.static(staticDir));
app.get('*', (req: Request, res: Response, next: NextFunction) => {
    next(createHttpError(NOT_FOUND));
});

app.use( (err: HttpError & Error, req: Request, res: Response, next: NextFunction) => {
    res.status(err.statusCode).json( ApiResponse.ERROR(err.message, err.statusCode));
});
// Export express instance
export default app;
