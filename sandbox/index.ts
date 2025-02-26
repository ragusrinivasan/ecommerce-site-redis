import 'dotenv/config';
import { client } from '../src/services/redis';

// sanbox to run the code and test
const run = async () => {
    await client.hSet('car1', {
        color: 'red',
        year: 1950
    });
    await client.hSet('car2', {
        color: 'green',
        year: 1955
    });
    await client.hSet('blue', {
        color: 'red',
        year: 1960
    });

    let commands = [1, 2, 3].map(_ => client.hGetAll(`car${_}`))

    let results = await Promise.all(commands);

    console.log(results);

};
run();
