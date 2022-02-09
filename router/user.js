const express=require('express')
const router=express.Router();
const bcrypt=require('bcrypt')
const userModel=require("../model/Schema/userSchema")
const checkExistUser=require("../middleware/checkExistUser")
const auth=require('../middleware/auth');

router.post("/register",checkExistUser,async(req,res)=>{
    try{
        const {name,email,password,phone,userType,city,interestedIn,dealsIn,companyName}=req.body
        const encryptedPassword=await bcrypt.hash(password,10)
        const user=new userModel({
            name,
            email,
            password:encryptedPassword,
            phone,
            userType,
            city,
            interestedIn,
            dealsIn,
            companyName
        })
        const data=await user.save();
        res.status(201).json({message:"user registered successfully",success:true,data})
    }catch(err){
        console.log(err)
        res.status(400).json({message:"Something went wrong",status:false,err:err.message})
    }
})

router.post("/login",async(req,res)=>{
    try{
        const {email,password}=req.body
        const user=await userModel.findOne({email})
        if(!user){
            return res.status(400).json({message:"user doesn't exist",success:false})
        }
        else{
            const verifiedPassword=await bcrypt.compare(password,user.password)
            if(!verifiedPassword){
                return res.status(400).json({message:"Invalid credentials",success:false})
            }
            else{
                const token=await user.generateToken();
                res.status(200).json({message:"user login successfully",success:true,token,data:user})
            }
        }
    }catch(err){
        console.log(err)
        res.status(400).json({message:"Something went wrong",success:false,err:err.message})
    }
})

//logged in user detail

router.get("/user",auth,async(req,res)=>{
try{
const data=await userModel.findById(req.user._id)
res.status(200).json({message:'logged in user Data',success:true,data})
}catch(err){
    console.log(err)
    res.status(400).json({message:"Something went wrong",success:false,err:err.message})
}
})
module.exports=router;