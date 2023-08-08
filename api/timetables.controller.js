import TimetablesDAO from "../dao/timetablesDAO.js";

export default class RoutesController {
    static async apiGetTimetables(req, res, next) {
        try {
            let timetables = await TimetablesDAO.getTimetables();
            if(!timetables) {
                res.status(404).json({ error: "not found" });
                return;
            }
            res.json(timetables);
        } catch(e) {
            console.log(`API, ${e}`);
            res.status(500).json({ error: e});
        }
    }

    static async apiGetTimetablesByRoute(req, res, next) {
        try {
            let name = req.params.routename
            let destination = req.body.destination
            let timetable = await TimetablesDAO.getTimetablesByRoute(name, destination);
            if(!timetable) {
                res.status(404).json({ error: "not found" });
                return;
            }
            res.json(timetable);
        } catch(e) {
            console.log(`API, ${e}`);
            res.status(500).json({ error: e});
        }
    }
}