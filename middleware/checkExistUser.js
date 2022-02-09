const userModel=require("../model/Schema/userSchema")

const checkExistUser=async(req,res,next)=>{
    try{
        const email=req.body.email
        const user=await userModel.findOne({email})
        if(user){
            return res.status(409).json({message:"user already exist",success:false})
        }
next();
    }catch(err){
        return res.status(409).json({message:"Something went wrong",success:false,err:err.message})
    }
  
    
}
module.exports=checkExistUser;