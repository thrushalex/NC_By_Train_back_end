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
}