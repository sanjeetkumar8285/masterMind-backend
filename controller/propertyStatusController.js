const propertyStatusModel=require('../model/Schema/propertyStatusSchema')

module.exports.addPropertyStatus=async(req,res)=>{
try{
const {name,status}=req.body
const property=new propertyStatusModel({
    userId:req.user._id,
    name,
    status
})
const data=await property.save();
res.status(201).json({message:"property status created successfully",success:true,data})
}catch(err){
    res.status(400).json({message:"something went wrong",success:false,err:err.message})
}
}

module.exports.getPropertyStatus=async(req,res)=>{
    try{
const keyword=req.query.keyword ?
        {
            name:{
                $regex:req.query.keyword,
                $options:"i"
            }
        }:{}
        const data=await propertyStatusModel.find({...keyword}).sort({'createdAt':-1})
        res.status(200).json({message:"property status retreived",success:true,data})
    }catch(err){
        res.status(400).json({message:"something went wrong",success:false,err:err.message})
    }
}
module.exports.updatePropertyStatus=async(req,res)=>{
    try{
        const id=req.params.id;
        const {name,status}=req.body
        const propertyStatus=await propertyStatusModel.findById(id)
        if(!propertyStatus){
            return res.status(400).json({message:"property status with this id doesn't exist",success:false})
        }
        const data=await propertyStatusModel.findByIdAndUpdate(id,{
            name,
            status
        },{new:true})
        
        res.status(200).json({message:"property status updated",success:true,data})
    }catch(err){
        res.status(400).json({message:"something went wrong",success:false,err:err.message})
    }
}
module.exports.deletePropertyStatus=async(req,res)=>{
        try{
            const id=req.params.id;
            const propertyStatus=await propertyStatusModel.findById(id)
            if(!propertyStatus){
                return res.status(400).json({message:"propertyStatus with this id doesn't exist",success:false})
            }
            const data=await propertyStatus.remove();
            res.status(200).json({message:"property status deleted",success:true,data})
    }catch(err){
        res.status(400).json({message:"something went wrong",success:false,err:err.message})
    }
}