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
            console.log(profileToAdd);
            return await profiles.insertOne(profileToAdd);
        } catch (e) {
            console.error(`Unable to add profile: ${e}`);
            return { error: e };
        }
    }

}