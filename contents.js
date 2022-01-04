const { MongoClient } = require('mongodb');
const date = require('date-and-time');
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'myProject';
const db = client.db(dbName);
const collection = db.collection('contents');

exports.Getcontent=async(req,res)=>{

    await client.connect();
    const findResult = await collection.find({}).toArray();
    res.json({
      "Found contents" : findResult
    });
  
  }
  exports.Getsortedcontent=async(req,res)=>{

    await client.connect();
    const findResult = await collection.find({}).sort("timestamp",-1).toArray();
    res.json({
      "Found contents" : findResult[0]
    });
  
  }

  exports.Postcontent=async(req,res)=>{
      
    var title= req.body.Title;
    var discription= req.body.Discription;
    const now=new Date();
    const value = date.format(now,'YYYY/MM/DD HH:mm:ss');
    await client.connect();
    const body ={
        "Title": title,
        "Discription": discription,
        "timestamp": value
        };
        db.collection("contents").insertOne(body, function(err, res) 
        {  
            if (err) throw err;  
            console.log("1 record inserted");
        });
    res.json({
        Content:"susscess"
    });
  
  }