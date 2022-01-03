const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');
var md5 = require('md5');

exports.login=(req,res)=>
{
    const email = req.body.email;
    var password = req.body.password;

    const { MongoClient } = require('mongodb');
    const url = 'mongodb://localhost:27017';
    const client = new MongoClient(url);
    const dbName = 'myProject';

    async function Loginvalidate()
    {
    await client.connect();
    const db = client.db(dbName); 
    const filteredDocs = await db.collection("documents").find({ "email" : email }).toArray();
    //console.log(md5(password));
    if(filteredDocs.length==0)
    {
        res.json({
            Login_error:"Email and password not matched"
        });
    }

    else if(email == filteredDocs[0].email && md5(password) == filteredDocs[0].password)
    {   
        console.log("login success");
        res.json(
            {
                login: "login success"
            }
        )
    }
    else
    {   
        console.log("login not success");
        res.json(
            {
                login: "login not success password mismatch"
            }
        )
    }
    return 'done.';
}
    Loginvalidate();
}