const add=require("../connection/connect");
var md5 = require('md5');

exports.signin=async(req,res)=>{

    const email = req.body.email;
    var password = req.body.password;
    const mobilenum = req.body.mobilenum;
    const encryptedPassword = md5(password);
    var flag=0;

    const { MongoClient } = require('mongodb');
    const url = 'mongodb://localhost:27017';
    const client = new MongoClient(url);
    const dbName = 'myProject';
    
    const body ={
        "email": email,
        "password": encryptedPassword,
        "mobilenum" : mobilenum
    };

    function passwordvalidate(password)
    {
        const length = password.length;
        var regx=/([a-z])/;
        var regx1=/([A-Z])/;
        var regx2=/([0-9])/;
        var regx3=/([. - @ $ # ! * ^])/;
    /* console.log(regx.test(password));
     console.log(regx1.test(password));
     console.log(regx2.test(password));
     console.log(regx3.test(password));*/

    //length calculation
     if(length==0)
     {
         res.json({
             length_error: "password is required"
            })  
     }
     else if( length>=8 && length<=12 )
     {
         console.log("password length is vallid");
     }
     else if(length<8)
     {
         console.log("password is not valid length is too short 8 to 12 character required ");
     }
     else if(length>12)
     {
         console.log("password is not valid length is long 8 to 12 character required ");
     }
    //password contrains checking
    if(regx.test(password))
        if(regx1.test(password))
         if(regx2.test(password))
             if(regx3.test(password))
             {
                 console.log("password is statisfy ");
             }
             else
             {
                res.json({
                    signup_error: "password must contain atleast one special character"
                });
             
             }
         else
         {
            res.json({
                signup_error: "password must contain alteast one number"
            });
         }
         else
        {
            res.json({
                signup_error: "password must contain atleast one uppercase letter"
            });
        }
        else
        {
            res.json({
                signup_error: "Password must contain atleast lowercase letter"
            });
        
        }
    
}
  
    async function insert() {
    await client.connect();
    const db = client.db(dbName);
    const filteredDocs = await db.collection("documents").find({ "email" : email }).toArray();
    if(filteredDocs.length==0)
    {
        db.collection("documents").insertOne(body, function(err, res) 
        {  
            if (err) throw err;  
            console.log("1 record inserted");
        });
        res.json({
            signup_success: "signup successfull"
        });
    }
    else if(filteredDocs.length==1)
    {   console.log("user exists");
        res.json({
            signup_error: "User already exists"
        });
    }
}

passwordvalidate(password);
insert();
}