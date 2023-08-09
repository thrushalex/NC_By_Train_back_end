import mongodb from 'mongodb';
const ObjectId = mongodb.ObjectId;

let routes;

export default class RoutesDAO {
    static async injectDB(conn) {
        if (routes) {
            return;
        }
        try {
            routes = await conn.db(
                process.env.NCBYTRAIN_COLLECTION)
                .collection('routes');
        } catch (e) {
            console.error(`Unable to connect to routesDAO: ${e}`)
        }
    }

    static async getRoutes() {
        let cursor;
        try {
            cursor = await routes.find();
            const routesList = await cursor.toArray();
            return { routesList };
        } catch (e) {
            console.error(`Unable to issue find command, ${e}`);
            return { routesList: []};
        }
    }

    static async getRouteNames() {
        let routeNames = []
        try {
            let routesList = (await RoutesDAO.getRoutes()).routesList;
            for (const element of routesList) {
                routeNames.push(element.name);
            }
            return routeNames;
        } catch (e) {
            console.error(`Unable to get route names, ${e}`);
            return routeNames;
        }
    }

    static async getRouteTerminiByName(name) {
        try {
            let route = await routes.aggregate([
                {
                    $match: {
                        name: name,
                    }
                },
            ]).next();
            if (route.cities.length >= 2) {
                return [route.cities[0], route.cities[route.cities.length - 1]]
            } else {
                return []
            }
        } catch (e) {
            console.error(`Unable to find route termini by name: ${e}`);
            throw e;
        }
    }

}