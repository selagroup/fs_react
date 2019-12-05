import { Router } from 'express';
import UserRouter from './Users';
import MoviesRouter from './Movies';
// Init router and path
const router = Router();

// Add sub-routes
router.use('/users', UserRouter);
router.use('/movies', MoviesRouter );

// Export the base-router
export default router;
