const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'myProject';
const db = client.db(dbName);
const collection = db.collection('documents');

exports.Findusers=async(req,res)=>{

  await client.connect();
  console.log('Connected successfully to db');
  const findResult = await collection.find({}).toArray();
  res.json({
    "Found documents" : findResult
  });

}
