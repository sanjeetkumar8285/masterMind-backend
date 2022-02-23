const sendMail=require("../utils/nodeMailer");

module.exports.contact=async(req,res)=>{
try{
const {name,email,subject,message}=req.body
await sendMail({
name,email,subject,message
})
res.status(200).json({message:`Email send to ${email} successfully`,success:true})
}catch(err){
    res.status(400).json({message:"Something went wrong",success:false,err:err.message})
}
}
