const jwt = require('jsonwebtoken');

const generateToken=(user)=>{
    return jwt.sign({id:user._id},process.env.SECRETKEY,{expiresIn:"5mins"})
}

module.exports=generateToken;