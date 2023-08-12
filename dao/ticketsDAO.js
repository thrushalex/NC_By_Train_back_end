import mongodb from 'mongodb';
const ObjectId = mongodb.ObjectId;

let tickets;

export default class TicketsDAO {
    static async injectDB(conn) {
        if (tickets) {
            return;
        }
        try {
            tickets = await conn.db(
                process.env.NCBYTRAIN_COLLECTION)
                .collection('tickets');
        } catch (e) {
            console.error(`Unable to connect to ticketsDAO: ${e}`)
        }
    }

    static async addTicket(userId, route, origin, destination, date) {
        try {
            const ticket= {
                userId: userId,
                route: route,
                origin: origin,
                destination: destination,
                purchaseDate: date,
                activationDate: null
            }
            return await tickets.insertOne(ticket);
        } catch (e) {
            console.error(`Unable to add ticket: ${e}`);
            return { error: e };
        }
    }

}