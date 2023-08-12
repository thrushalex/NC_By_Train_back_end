import TicketsDAO from "../dao/ticketsDAO.js";

export default class TicketsController {

    static async apiAddTicket(req, res, next){
        try {
            const userId = req.body.userId;
            const route = req.body.route;
            const origin = req.body.origin;
            const destination = req.body.destination;

            const date = new Date();
    
            const ticketResponse = await TicketsDAO.addTicket(
                userId,
                route,
                origin,
                destination,
                date
            );
    
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

}

