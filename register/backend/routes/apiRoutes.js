const express=require('express');
const router=express.Router();

const {createUser,loginUser}=require('../controller/userController');
const verifyToken = require('../middleware/index');

router.post('/register',createUser);
router.post('/login',loginUser);
router.get('/Protected',verifyToken,(req,res)=>{
    res.json({ message: `Token verified, Welcome ${req.user.email} ! This is a protected route.` });
})

module.exports=router;