import express from 'express';
import RoutesController from './routes.controller.js';
// import TicketsController from './tickets.controller.js';
// import TimeTablesContoller from './timetables.controller.js';

const router = express.Router(); // Get access to Express router

router.route('/').get(RoutesController.apiGetRoutes);

export default router;
