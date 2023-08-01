import mongodb from 'mongodb';
import dotenv from 'dotenv';
import app from './server.js';
import RoutesDAO from './dao/routesDAO.js';

async function main() {
 dotenv.config();

 const client = new mongodb.MongoClient(
    process.env.NCBYTRAIN_DB_URI
 );

 const port = process.env.PORT || 8000;

 try {
    // Connect to MongoDB server
    await client.connect();
    await RoutesDAO.injectDB(client);

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
 } catch (e) {
    console.log(e);
    process.exit(1);
 }
}

main().catch(console.error);