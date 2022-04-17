import { Router } from 'express';
import prosesController from '../controllers/prosesController';

const route = Router();
export default (app: Router): void => {
   app.use('/proses', route);
   route.post('/comments', prosesController.prosesComments);
};
