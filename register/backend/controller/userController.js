const RegisterSchema = require("../models/UserModel");
const nodemailer=require('nodemailer');
const bcrypt = require("bcryptjs");

const createUser = async (req, res) => {
  const { Name, EmailId, Phoneno, Password } = req.body;
  try {
    const checkmail = await RegisterSchema.findOne({ email: EmailId });
    if (checkmail) {
      return res.status(200).json({ message: "EmailId already exists" });
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

module.exports = { createUser };
