import RoutesDAO from "../dao/routesDAO.js";

export default class RoutesController {
    static async apiGetRoutes(req, res, next) {
        try {
            let routes = await RoutesDAO.getRoutes();
            if(!routes) {
                res.status(404).json({ error: "not found" });
                return;
            }
            res.json(routes);
        } catch(e) {
            console.log(`API, ${e}`);
            res.status(500).json({ error: e});
        }
    }
    static async apiGetRouteNames(req, res, next) {
        try {
            let routes = await RoutesDAO.getRouteNames();
            if(!routes) {
                res.status(404).json({ error: "not found" });
                return;
            }
            res.json(routes);
        } catch(e) {
            console.log(`API, ${e}`);
            res.status(500).json({ error: e});
        }
    }
    static async apiGetRouteTerminiByName(req, res, next) {
        try {
            let termini = await RoutesDAO.getRouteTerminiByName(req.params.routename);
            if(!termini) {
                res.status(404).json({ error: "not found" });
                return;
            }
            res.json(termini);
        } catch(e) {
            console.log(`API, ${e}`);
            res.status(500).json({ error: e});
        }
    }
    static async apiGetRouteStopsByName(req, res, next) {
        try {
            let stops = await RoutesDAO.getRouteStopsByName(req.params.routename);
            if(!stops) {
                res.status(404).json({ error: "not found" });
                return;
            }
            res.json(stops);
        } catch(e) {
            console.log(`API, ${e}`);
            res.status(500).json({ error: e});
        }
    }

    static async apiGetSegmentDistance(req, res, next) {
        try {
            let distance = await RoutesDAO.getSegmentDistance(req.params.routename, req.params.origin, req.params.destination);
            if(!distance) {
                res.status(404).json({ error: "not found" });
                return;
            }
            res.json(distance);
        } catch(e) {
            console.log(`API, ${e}`);
            res.status(500).json({ error: e});
        }
    }
}