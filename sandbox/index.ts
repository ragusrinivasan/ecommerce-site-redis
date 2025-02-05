import 'dotenv/config';
import { client } from '../src/services/redis';

// sanbox to run the code and test
const run = async () => {
    console.log(await client.hGetAll('cars#553'))
};
run();
