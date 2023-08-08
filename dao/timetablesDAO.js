import mongodb from 'mongodb';
const ObjectId = mongodb.ObjectId;

let timetables;

export default class TimetablesDAO {
    static async injectDB(conn) {
        if (timetables) {
            return;
        }
        try {
            timetables = await conn.db(
                process.env.NCBYTRAIN_COLLECTION)
                .collection('timetables');
        } catch (e) {
            console.error(`Unable to connect to timetablesDAO: ${e}`)
        }
    }

    static async getTimetables() {
        let cursor;
        try {
            cursor = await timetables.find();
            const timetablesList = await cursor.toArray();
            return { timetablesList };
        } catch (e) {
            console.error(`Unable to issue find command, ${e}`);
            return { timetablesList: null};
        }
    }

    static async getTimetablesByRoute(name, destination) {
        try {
            return await timetables.aggregate([
                {
                    $match: {
                        name: name,
                        destination: destination,
                    }
                },
            ]).next();
        } catch (e) {
            console.error(`Unable to find timetable by name and destination: ${e}`);
            throw e;
        }
    }
}