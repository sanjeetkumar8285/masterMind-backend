const sendMail=require("../utils/nodeMailer");
const contactBuilderModel=require("../model/Schema/contactBuilder")

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

module.exports.contactBuilder=async(req,res)=>{
    try{
        const {name,email,phone,message}=req.body
        const contact=new contactBuilderModel({
            name,
            email,
            phone,
            message
        })
        const data=await contact.save();
        res.status(200).json({message:"contact form submitted successfully",success:true,data})
    }catch(err){
        res.status(400).json({message:"Something went wrong",success:false,err:err.message})
    }
}

module.exports.deleteContact=async(req,res)=>{
    try{
        const id=req.params.id
        const contact=await contactBuilderModel.findById(id);
        if(!contact){
           return res.status(400).json({message:"data with this id doesn't exist",success:false})
        }
        const data=await contact.remove();
        res.status(200).json({message:"Contact Data deleted Successfully",success:true,data})
    }
    catch(err){
        res.status(400).json({message:"Something went wrong",success:false,err:err.message})
    }
}