const { MongoClient } = require('mongodb');
const date = require('date-and-time');

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'myProject';
const db = client.db(dbName);
const collection = db.collection('Timed_contents');

exports.GetTimecontent=async(req,res)=>{

    await client.connect();
    const now=new Date();
    const currenttime = date.format(now,'YYYY/MM/DD HH:mm:ss');
    console.log(currenttime);
    const findResult = await collection.find({}).toArray();
    var length=findResult.length;
    var count=0;
    for(var i=0;i<length;i++)
    {
        if(currenttime>=findResult[i].Start_time && currenttime<=findResult[i].End_time)
        {
            console.log(findResult[i]);
            count++;
            console.log(count);
        }
    }
    
   res.json({
        "foundcount":count
   });
  }

  exports.PostTimecontent=async(req,res)=>{
      
    var title= req.body.Title;
    var discription= req.body.Discription;
    const start=req.body.Starttime;
    const end=req.body.endtime;
    const now=new Date();
    const stime=date.parse(start, 'YYYY/MM/DD HH:mm:ss');
    const startvalue = date.format(stime,'YYYY/MM/DD HH:mm:ss');
    const etime=date.parse(end, 'YYYY/MM/DD HH:mm:ss');
    const endvalue = date.format(etime,'YYYY/MM/DD HH:mm:ss');
    const value = date.format(now,'YYYY/MM/DD HH:mm:ss');

    if(stime=="Invalid Date")
    {
        res.json({
            Date_and_time_error : "Stating time and date to be in format of YYYY/MM/DD HH:mm:ss"
          });
    }
    else if(etime=="Invalid Date")
    {
        res.json({
            Date_and_time_error :"Ending time and date to be in format of YYYY/MM/DD HH:mm:ss"
          });
    }
    else{
    await client.connect();
    const body ={
        "Title": title,
        "Discription": discription,
        "Start_time":startvalue,
        "End_time":endvalue,
        "timestamp": value
        };
        db.collection("Timed_contents").insertOne(body, function(err, res) 
        {  
            if (err) throw err;  
            console.log("1 record inserted");
        });
    res.json({
        Content:"susscess"
    });
    }
  
}