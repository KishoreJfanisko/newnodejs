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
   /*const findResult = await collection.find({"timestamp":{$lt : new Date(),$gt: new Date(new Date().getTime()-(60*1000))}})
   // .sort("timestamp",-1).limit(10).toArray();
   console.log(new Date());
    console.log(new Date(new Date().getTime()-(60*60*1000)));
    const date = require('date-and-time')
  
// Creating object of current date and time 
// by using Date() 
const now  =  new Date();
  
// Formating the date and time
// by using date.format() method
const value = date.format(now,'YYYY/MM/DD HH:mm:ss');
  
// Display the result
console.log("current date and time : " + value)*/
  res.json({
    "Found documents" : findResult
  });

}
