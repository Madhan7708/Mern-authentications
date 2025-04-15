const jwt=require('jsonwebtoken');
const RegisterSchema = require("../models/UserModel");

const verifyToken=(req,res,next)=>{
    const authheader=req.headers.authorization;
    if(!authheader){
        return res.json({message:"Token not found"});
    }
    const token=authheader.split(" ")[1];
    jwt.verify(token,process.env.SECRETKEY,async(err,decode)=>{
        if(err){
            return res.json({message:"token are invalid"});
        }
        const Decode=await RegisterSchema.findOne({_id:decode.id})
        if(!Decode){
            return res.json({message:"user not found"});
        }
        req.user=Decode;
        next();
    })

}

module.exports=verifyToken;