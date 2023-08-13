import express from 'express';
import RoutesController from './routes.controller.js';
import TicketsController from './tickets.controller.js';
import TimeTablesContoller from './timetables.controller.js';

const router = express.Router(); // Get access to Express router

router.route('/routes').get(RoutesController.apiGetRoutes);
router.route('/routes/names').get(RoutesController.apiGetRouteNames);
router.route('/routes/routename/:routename/termini').get(RoutesController.apiGetRouteTerminiByName);
router.route('/routes/routename/:routename/stops').get(RoutesController.apiGetRouteStopsByName);

router.route('/tickets/user/:userId/').get(TicketsController.apiGetTicketsByUserId);
router.route('/tickets').post(TicketsController.apiAddTicket);
router.route('/tickets/activate').put(TicketsController.apiActivateTicket);

router.route('/timetables').get(TimeTablesContoller.apiGetTimetables);
router.route('/timetables/routename/:routename/destination/:destination').get(TimeTablesContoller.apiGetTimetablesByRoute);

export default router;
