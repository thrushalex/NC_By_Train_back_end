import express from 'express';
import RoutesController from './routes.controller.js';
// import TicketsController from './tickets.controller.js';
import TimeTablesContoller from './timetables.controller.js';

const router = express.Router(); // Get access to Express router

router.route('/routes').get(RoutesController.apiGetRoutes);
router.route('/routes/names').get(RoutesController.apiGetRouteNames);

router.route('/timetables').get(TimeTablesContoller.apiGetTimetables);
router.route('/timetables/routename/:routename').get(TimeTablesContoller.apiGetTimetablesByRoute);

export default router;
