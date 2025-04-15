const mongoose=require('mongoose');
const userScema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phoneno:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    }
},
{
    timestamps:true
})
module.exports=mongoose.model('Register',userScema);