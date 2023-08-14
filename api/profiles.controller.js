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

    static async apiGetProfile(req, res, next){
        try {
            let userId = req.params.userId || {}
            let profile = await ProfilesDAO.getProfile(userId);
            if (!profile) {
                res.status(404).json({ error: "not found" });
                return false;
            }
            res.json(profile);
        } catch(e) {
            console.log(`API, ${e}`);
            res.status(500).json({ error: e});
        }
    }

    static async apiUpdateProfile(req, res, next) {
        try {
            const profile = req.body;

            const profileUpdateResponse = await ProfilesDAO.updateProfile(
                profile
            );

            var { error } = profileUpdateResponse;

            if (error) {
                res.status(500).json({ error: "Unable to update profile" });
            } else {
                if (profileUpdateResponse.modifiedCount === 1) {
                    res.json({
                        status: "success",
                        response: profileUpdateResponse
                    });
                } else {
                    if (profileUpdateResponse.matchedCount === 0) {
                        res.status(500).json({ error: `Unable to update profile, as a profile with the provided id (${profile.userId}) was not found` });
                    } else {
                        res.status(500).json({ error: `Unable to update profile for an unknown reason` });
                    }
                }
            }

        } catch(e) {
            res.status(500).json({ error: e });
        }
    }
}

