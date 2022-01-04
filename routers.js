const express = require("express");

const {Findusers} = require("../connection/connect");
const {Getcontent,Postcontent, Getsortedcontent}=require("../connection/contents");
const { PostTimecontent, GetTimecontent }=require("../connection/timecontent");
const {signin}= require("../validations/signin.js");
const {login}= require("../validations/login.js");

//const validater=require('../validator/validation');
const router = express.Router();

router.get("/",Findusers);
router.post("/signin",signin);
router.post("/login",login);
router.get("/getcontent",Getcontent);
router.get("/getsorted",Getsortedcontent);
router.post("/postcontent",Postcontent);
router.post("/postcontenttime",PostTimecontent);
router.get("/getcontenttime",GetTimecontent);

module.exports= router;
