const jwt = require('jsonwebtoken');

const generateToken=(user)=>{
    const payload = {                      //to display content of the enitire items
        id:user._id,
        email: user.email,
        name: user.name,           
        phone: user.phoneno
      };
    // return jwt.sign({id:user._id},process.env.SECRETKEY,{expiresIn:"5mins"})   // to give only id
    return jwt.sign(payload,process.env.SECRETKEY,{expiresIn:"10mins"})
}

module.exports=generateToken;