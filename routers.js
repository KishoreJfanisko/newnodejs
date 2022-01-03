const express = require("express");

const {Findusers} = require("../connection/connect");
const {Getcontent,Postcontent}=require("../connection/contents");
const {signin}= require("../validations/signin.js");
const {login}= require("../validations/login.js");

//const validater=require('../validator/validation');
const router = express.Router();

router.get("/",Findusers);
router.post("/signin",signin);
router.post("/login",login);
router.get("/getcontent",Getcontent);
router.post("/postcontent",Postcontent);

module.exports= router;
