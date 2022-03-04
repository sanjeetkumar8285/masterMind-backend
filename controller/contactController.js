const sendMail=require("../utils/nodeMailer");
const contactBuilderModel=require("../model/Schema/contactBuilder")

module.exports.contact=async(req,res)=>{
try{
const {name,email,subject,message}=req.body
sendMail({
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
module.exports.getContactBuilder=async(req,res)=>{
    try{
        const {page}=req.query
        const limit=20;
        const startIndex=(Number(page)-1)*limit
        const total=await contactBuilderModel.countDocuments();
        const contactBuilder=await contactBuilderModel.find().sort({_id:-1}).limit(limit).skip(startIndex)
        res.status(200).json({data:contactBuilder,currentPage:Number(page),numberofPage:Math.ceil(total/limit)})
    }catch(err){
        res.status(400).json({message:"Something went wrong",success:false,err:err.message})
    }
    }
    
    module.exports.searchContactBuilder=async(req,res)=>{
        try{
        const keyword=req.query.keyword ? {
            name:{
                $regex:req.query.keyword,
                $options:"i"
            }
        }:{}
        const data=await contactBuilderModel.find({...keyword}).sort({"createdAt":-1})
        res.status(200).json({message:"All Data Retrieved",success:true,data})
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