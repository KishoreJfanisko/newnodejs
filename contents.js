const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'myProject';
const db = client.db(dbName);
const collection = db.collection('contents');

exports.Getcontent=async(req,res)=>{

    await client.connect();

    const findResult = await collection.find({"timestamp":{$lt : new Date(),$gt: new Date(new Date().getTime()-(24*60*60*1000))}})
    .sort("timestamp",-1).limit(10).toArray();
    res.json({
      "Found documents" : findResult
    });
  
  }

  exports.Postcontent=async(req,res)=>{
      
    var title= req.body.Title;
    var discription= req.body.Discription;
    await client.connect();
    const body ={
        "Title": title,
        "Discription": discription,
        "timestamp": new Date()
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