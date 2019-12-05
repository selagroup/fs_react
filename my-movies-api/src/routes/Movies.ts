import { Router } from 'express';
import * as controller from '../controllers/movies.controller';
const router = Router();

router.get('/',  controller.getMovies );
router.put('/:movieId',  controller.updateMovie );
router.post('/',  controller.addMovie );

export default router;
