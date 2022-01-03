
const nodemailer = require("nodemailer");

exports.main=async(req,res)=> {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });

  let info = await transporter.sendMail({
    from: 'kishore2862000@gmail.com', 
    to: "kishorej@fanisko.com", 
    subject: "Hello ✔", 
    text: "Hello world?", 
    html: "<b>Hello world?</b>",
  });

  console.log("Message sent: %s", info.messageId); 
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}


