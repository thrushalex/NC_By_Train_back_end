import ProfilesDAO from "../dao/profilesDAO.js";

export default class ProfilesController {

    static async apiAddProfile(req, res, next){
        try {
            const profile = req.body;

            const profileResponse = await ProfilesDAO.addProfile(
                profile,
            );
    
            var { error } = profileResponse;
    
            if (error) {
                res.status(500).json({ error: "Unable to add profile" });
            } else {
                res.json({
                    status: "success",
                    response: profileResponse
                });
            }
        } catch(e) {
            res.status(500).json({ error: e });
        }

    }
}

