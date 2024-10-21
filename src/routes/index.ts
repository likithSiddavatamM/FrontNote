import express, { IRouter } from 'express';
const router = express.Router();

import userRoute from './user.route';
import noteRoute from './note.route';


/**
 * Function contains Application routes
 *
 * @returns router
 */
const routes = (): IRouter => {
  router.get('/', (req, res) => {
    res.json('Welcome');
  });
  router.use('/user', new userRoute().getRoutes());
  router.use('/usernotes', new noteRoute().getRoutes());
  return router;
};

export default routes;
