const userModel=require('../model/Schema/userSchema');
const jwt=require('jsonwebtoken');

const auth=async function(req,res,next){
    try{
        const token=req.headers.authorization
        if(!token){
            return res.status(400).json({message:"No token provided",success:false})
        }
        else{
            const profileData=jwt.verify(token,process.env.jwtSecretKey)
            const user=await userModel.findById(profileData.id)
            if(!user){
                throw new Error("user not found")
            }
            else{
                req.user=user
                next();
            }
        }
    }catch(err){
      return  res.status(400).json({message:"Unauthorized: Invalid token. First Sign In",success:false})
    }

}
module.exports=auth;