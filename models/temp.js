import { MongoClient } from 'mongodb';
import {
    ObjectId
} from 'mongodb';

/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */

const agg = [
    {
        '$match': {
            'product': new ObjectId('639f2d6ac9bb373d77f4428f')
        }
    }, {
        '$group': {
            '_id': null,
            'averageRating': {
                '$avg': '$rating'
            },
            'numOfReviews': {
                '$sum': 1
            }
        }
    }
];

const client = await MongoClient.connect(
    '',
    { useNewUrlParser: true, useUnifiedTopology: true }
);
const coll = client.db('10-ECOMMERCE-API').collection('reviews');
const cursor = coll.aggregate(agg);
const result = await cursor.toArray();
await client.close();

// 3ce9a64e97d451fff1ea2cb99aa48898816b328176e36be9d0156f8232691399


// import { MongoClient } from 'mongodb';
// import {
//   ObjectId
// } from 'mongodb';

// /*
//  * Requires the MongoDB Node.js Driver
//  * https://mongodb.github.io/node-mongodb-native
//  */

// const agg = [
//   {
//     '$match': {
//       'product': new ObjectId('63a1b198e51ecab18bd32530')
//     }
//   }, {
//     '$group': {
//       '_id': '$rating',
//       'amount': {
//         '$sum': 1
//       }
//     }
//   }
// ];

// const client = await MongoClient.connect(
//   '',
//   { useNewUrlParser: true, useUnifiedTopology: true }
// );
// const coll = client.db('10-ECOMMERCE-API').collection('reviews');
// const cursor = coll.aggregate(agg);
// const result = await cursor.toArray();
// await client.close();