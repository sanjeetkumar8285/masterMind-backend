const bcrypt=require('bcrypt')
const adminModel=require("../model/Schema/AdminSchema")


module.exports.adminRegister=async(req,res)=>{
    try{
        const {name,email,password}=req.body
        const existAdmin=await adminModel.findOne({email})
        if(existAdmin){
            return  res.status(400).json({message:"Admin already exist",success:false})
        }
        const encryptedPassword=await bcrypt.hash(password,10)
        const admin=new adminModel({
            name,
            email,
            password:encryptedPassword,
        })
        const data=await admin.save();
        res.status(201).json({message:"admin registered successfully",success:true,data})
    }catch(err){
        console.log(err)
        res.status(400).json({message:"Something went wrong",status:false,err:err.message})
    }
}

module.exports.adminLogin=async(req,res)=>{
    try{
        const {email,password}=req.body
        const admin=await adminModel.findOne({email})
        if(!admin){
            return res.status(400).json({message:"admin doesn't exist",success:false})
        }
        else{
            const verifiedPassword=await bcrypt.compare(password,admin.password)
            if(!verifiedPassword){
                return res.status(400).json({message:"Invalid credentials",success:false})
            }
            else{
                const token=await admin.generateToken();
                res.status(200).json({message:"admin login successfully",success:true,token,data:admin})
            }
        }
    }catch(err){
        console.log(err)
        res.status(400).json({message:"Something went wrong",success:false,err:err.message})
    }
}