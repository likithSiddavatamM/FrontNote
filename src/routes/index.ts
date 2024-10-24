import express, { IRouter } from 'express';
const router = express.Router();
import userRoute from './user.route';
import noteRoute from './note.route';
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerDocument from '../../Swagger/openApi.json'

/**c
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
  router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  return router;
};

export default routes;
