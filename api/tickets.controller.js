import TicketsDAO from "../dao/ticketsDAO.js";

export default class TicketsController {

    static async apiAddTicket(req, res, next){
        try {
            const userId = req.body.userId;
            const route = req.body.route;
            const origin = req.body.origin;
            const destination = req.body.destination;
            const quantity = req.body.quantity;

            const date = new Date();

            let ticketResponse;
            for (let i = 0; i < quantity; i++) {
                ticketResponse = await TicketsDAO.addTicket(
                    userId,
                    route,
                    origin,
                    destination,
                    date
                );
            }
    
            var { error } = ticketResponse;
    
            if (error) {
                res.status(500).json({ error: "Unable to add ticket" });
            } else {
                res.json({
                    status: "success",
                    response: ticketResponse
                });
            }
        } catch(e) {
            res.status(500).json({ error: e });
        }

    }

    static async apiGetTicketsByUserId(req, res, next) {
        try {
            let tickets = await TicketsDAO.getTicketsByUserId(req.params.userId);
            if(!tickets) {
                res.status(404).json({ error: "not found" });
                return;
            }
            res.json(tickets);
        } catch(e) {
            console.log(`API, ${e}`);
            res.status(500).json({ error: e});
        }
    }

    static async apiActivateTicket(req, res, next) {
        try {
            const ticketId = req.body.ticketId;
            let currentDate = new Date();
            const date = new Date(currentDate.getTime() + 2 * 60 * 60 * 1000);

            const ticketActivationResponse = await TicketsDAO.activateTicket(
                ticketId, date
            );

            var { error } = ticketActivationResponse;

            if (error) {
                res.status(500).json({ error: "Unable to activate ticket" });
            } else {
                if (ticketActivationResponse.modifiedCount === 1) {
                    res.json({
                        status: "success",
                        response: ticketActivationResponse
                    });
                } else {
                    if (ticketActivationResponse.matchedCount === 0) {
                        res.status(500).json({ error: `Unable to activate ticket, as a ticket with the provided ticket id (${ticketId}) was not found` });
                    } else {
                        res.status(500).json({ error: `Unable to activate ticket for an unknown reason` });
                    }
                }
            }

        } catch(e) {
            res.status(500).json({ error: e });
        }
    }

    static async apiDeleteTicketsByUserId(req, res, next) {
        try {
            let currentDate = new Date();
            let ticketsDeleteResponse = await TicketsDAO.deleteExpiredTicketsByUserId(req.params.userId, currentDate);
            if(!ticketsDeleteResponse) {
                res.status(404).json({ error: "not found" });
                return;
            }
            res.json(ticketsDeleteResponse);
        } catch(e) {
            console.log(`API, ${e}`);
            res.status(500).json({ error: e});
        }
    }
}

