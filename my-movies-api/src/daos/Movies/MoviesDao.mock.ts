import { getRandomInt } from '@shared';
import { MockDaoMock } from '../MockDb/MockDao.mock';
import { IMovie } from '../../entities';

export class MoviesDao extends MockDaoMock {

    public async getAll(): Promise<IMovie[]> {
        try {
            const db = await super.openDb();
            return db.movies;
        } catch (err) {
            throw err;
        }
    }

    public async add(movie: IMovie): Promise<IMovie> {
        try {
            const db = await super.openDb();
            movie.id = getRandomInt();
            db.movies.push(movie);
            await super.saveDb(db);
            return movie;
        } catch (err) {
            throw err;
        }
    }

    public async update(movie: IMovie): Promise<IMovie> {
        try {
            const db = await super.openDb();
            for (let i = 0; i < db.movies.length; i++) {
                if (db.movies[i].id === movie.id) {
                    db.movies[i] = movie;
                    await super.saveDb(db);
                    return db.movies[i];
                }
            }
            throw new Error('Movie not found');
        } catch (err) {
            throw err;
        }
    }

    public async delete(id: number): Promise<void> {
        try {
            const db = await super.openDb();
            for (let i = 0; i < db.movies.length; i++) {
                if (db.movies[i].id === id) {
                    db.movies.splice(i, 1);
                    await super.saveDb(db);
                    return;
                }
            }
            throw new Error('User not found');
        } catch (err) {
            throw err;
        }
    }
}
