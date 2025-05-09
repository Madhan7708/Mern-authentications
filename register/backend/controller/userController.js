const RegisterSchema = require("../models/UserModel");
const nodemailer=require('nodemailer');
const bcrypt = require("bcryptjs");
const generateToken=require('../utils/index');
const jwt=require('jsonwebtoken');
const  mailtransport=nodemailer.createTransport({
  service:"gmail",
  host: "smtp.gmail.com",
  port: 465,              // Secure SSL port
  secure: true,
  auth:{
    user:"",
    pass:""
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
      isVerified:false,
    });
    const token =await generateToken(Register);
    const url = `http://localhost:7000/task/verifiedLogin/${token}`;
    
    console.log(Register);
    const mailoption={
      from:"testingwebtech07@gmail.com",
      to:EmailId,
      subject:" Testing Team Account Registration Success",
      html: `
    <p>Your account has been successfully registered. Welcome to our platform!</p>
    <a href="${url}" style="display: inline-block; padding: 10px 15px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px;">
      Verify Account
    </a>
  `
    }

    mailtransport.sendMail(mailoption,(err,info)=>{
      if(err){
        console.log(err);
      }
      else{
        console.log("Mail send success");
      }
    })
    res.status(200).json({ message: "User Register Success and mailer send success", Register,token });
  } catch (err) {
    console.log(err);
  }
};


const authenticate = async (req, res) => {
  const { id: token } = req.params;
  try {
    const jwtToken = jwt.verify(token, process.env.SECRETKEY);
    console.log(jwtToken)
    const User = await RegisterSchema.findOne({ _id: jwtToken.id });
    console.log(User);
    if (!User) {
      return res.json({ Message: "User not available" });
    }
    User.isVerified = true;
    await User.save();
    res.status(200).send("Email verification successful. You can now log in.");
  } catch (err) {
    res.status(401).send("Token has expired or is invalid"); 
    console.log("Token error:", err.message);
  }
};

const loginUser=async(req,res)=>{
  const {EmailId,Password}=req.body;
  try{
    const User=await RegisterSchema.findOne({email:EmailId});
    if(!User){
      return res.status(201).json({message:"User not found"});
    }
    if (!User.isVerified) {
      return res.status(201).json({ message: "User not verified" });
    }
    const password=await bcrypt.compare(Password,User.password);
    if(!password){
      return res.status(201).json({message:"Password not match"});
    }
    
    const token =await generateToken(User);
    console.log(token);
    
    const mailoption={
      from:"testingwebtech07@gmail.com",
      to:EmailId,
      subject:" Testing Team Login Success",
      text:` Your are logined into our Account. Welcome to our platform!  `
    }

    mailtransport.sendMail(mailoption,(err,info)=>{
      if(err){
        console.log(err);
      }
      else{
        console.log("Mail send success");
      }
    })

    return res.status(200).json({message:"login success",token});
  }
  catch(err){
    console.log(err);
  }
}
module.exports = { createUser,loginUser,authenticate};
