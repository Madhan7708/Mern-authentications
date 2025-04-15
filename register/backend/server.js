const express=require('express');
const app=express();
const mongoose=require('mongoose');
require('dotenv').config();
const taskroutes=require('./routes/apiRoutes');
const cors=require('cors');
app.use(express.json());
app.use(cors());
app.use('/task',taskroutes);

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`server is listening at port is `+process.env.PORT+` db connected success`);
    })
})
.catch((err)=>{
    console.log(err);
})
