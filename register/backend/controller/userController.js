const RegisterSchema = require("../models/UserModel");
const nodemailer=require('nodemailer');
const bcrypt = require("bcryptjs");
const generateToken=require('../utils/index');
const  mailtransport=nodemailer.createTransport({
  service:"gmail",
  host: "smtp.gmail.com",
  port: 465,              // Secure SSL port
  secure: true,
  auth:{
    user:"testingwebtech07@gmail.com",
    pass:"hafzdrsvasgxidqt"
  }
})

const createUser = async (req, res) => {
  const { Name, EmailId, Phoneno, Password } = req.body;
  console.log(Password);
  try {
    const checkmail = await RegisterSchema.findOne({ email: EmailId });
    if (checkmail) {
      return res.status(201).json({ message: "EmailId already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const HashPassword = await bcrypt.hash(Password, salt);
    const Register = await RegisterSchema.create({
      name: Name,
      email: EmailId,
      phoneno: Phoneno,
      password: HashPassword,
    });
    console.log(Register);
    const mailoption={
      from:"testingwebtech07@gmail.com",
      to:EmailId,
      subject:" Testing Team Account Registration Success",
      text:"Your account has been successfully registered. Welcome to our platform!"
    }

    mailtransport.sendMail(mailoption,(err,info)=>{
      if(err){
        console.log(err);
      }
      else{
        console.log("Mail send success");
      }
    })
    res.status(200).json({ message: "User Register Success and mailer send success", Register });
  } catch (err) {
    console.log(err);
  }
};

const loginUser=async(req,res)=>{
  const {EmailId,Password}=req.body;
  try{
    const User=await RegisterSchema.findOne({email:EmailId});
    if(!User){
      return res.status(201).json({message:"User not found"});
    }

    const password=await bcrypt.compare(Password,User.password);
    if(!password){
      return res.status(201).json({message:"Password not match"});
    }

    const token =await generateToken(User);
    console.log(token);
    // const mailoption={
    //   from:"testingwebtech07@gmail.com",
    //   to:EmailId,
    //   subject:" Testing Team Login Success",
    //   text:"Your are logined into our Account. Welcome to our platform!"
    // }

    // mailtransport.sendMail(mailoption,(err,info)=>{
    //   if(err){
    //     console.log(err);
    //   }
    //   else{
    //     console.log("Mail send success");
    //   }
    // })

    return res.status(200).json({message:"login success",token});
  }
  catch(err){
    console.log(err);
  }
}
module.exports = { createUser,loginUser};
