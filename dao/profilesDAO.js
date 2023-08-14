import mongodb from 'mongodb';
const ObjectId = mongodb.ObjectId;

let profiles;

export default class ProfilesDAO {
    static async injectDB(conn) {
        if (profiles) {
            return;
        }
        try {
            profiles = await conn.db(
                process.env.NCBYTRAIN_COLLECTION)
                .collection('profiles');
        } catch (e) {
            console.error(`Unable to connect to profilesDAO: ${e}`)
        }
    }

    static async addProfile(profile) {
        try {
            const profileToAdd = {
                userId: profile.userId,
                firstName: profile.firstName,
                lastName: profile.lastName,
                address: profile.address,
                city: profile.city,
                state: profile.state,
                country: profile.country,
                zipCode: profile.zipCode,
                creditCardNumber: profile.creditCardNumber,
                cvv: profile.cvv,
            }
            return await profiles.insertOne(profileToAdd);
        } catch (e) {
            console.error(`Unable to add profile: ${e}`);
            return { error: e };
        }
    }

    static async getProfile(userId) {
        try {
            return await profiles.aggregate([
                {
                    $match: {
                        userId: userId,
                    }
                }
            ]).next();
        } catch (e) {
            console.error(`Unable to get movie by ID: ${e}`);
            throw e;
        }
    }

    static async updateProfile(profile) {
        try {
            return await profiles.updateOne(
                { 
                    userId: profile.userId,
                }, 
                { $set: {
                    firstName: profile.firstName,
                    lastName: profile.lastName,
                    address: profile.address,
                    city: profile.city,
                    state: profile.state,
                    country: profile.country,
                    zipCode: profile.zipCode,
                    creditCardNumber: profile.creditCardNumber,
                    cvv: profile.cvv,
                } },
                false
                );
        } catch (e) {
            console.error(`Unable to update profile: ${e}`);
            return { error: e };
        }
    }

}