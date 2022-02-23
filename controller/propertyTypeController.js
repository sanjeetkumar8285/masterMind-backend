const propertyTypeModel=require('../model/Schema/propertyTypeSchema')

module.exports.addPropertyType=async(req,res)=>{
try{
const {name,status}=req.body
const property=new propertyTypeModel({
    userId:req.user._id,
    name,
    status
})
const data=await property.save();
res.status(201).json({message:"Property Type Created Successfully",success:true,data})
}catch(err){
    res.status(400).json({message:"something went wrong",success:false,err:err.message})
}
}

module.exports.getPropertyType=async(req,res)=>{
    try{
const keyword=req.query.keyword ?
        {
            name:{
                $regex:req.query.keyword,
                $options:"i"
            }
        }:{}
        const data=await propertyTypeModel.find({...keyword}).sort({'createdAt':-1})
        res.status(200).json({message:"Property type retreived",success:true,data})
    }catch(err){
        res.status(400).json({message:"something went wrong",success:false,err:err.message})
    }
}
module.exports.updatePropertyType=async(req,res)=>{
    try{
        const id=req.params.id;
        const {name,status}=req.body
        const propertyType=await propertyTypeModel.findById(id)
        if(!propertyType){
            return res.status(400).json({message:"propertyType with this id doesn't exist",success:false})
        }
        const data=await propertyTypeModel.findByIdAndUpdate(id,{
            name,
            status
        },{new:true})
        
        res.status(200).json({message:"Property Type Updated",success:true,data})
    }catch(err){
        res.status(400).json({message:"something went wrong",success:false,err:err.message})
    }
}
module.exports.deletePropertyType=async(req,res)=>{
        try{
            const id=req.params.id;
            const propertyType=await propertyTypeModel.findById(id)
            if(!propertyType){
                return res.status(400).json({message:"propertyType with this id doesn't exist",success:false})
            }
            const data=await propertyType.remove();
            res.status(200).json({message:"Property Type Deleted",success:true,data})
    }catch(err){
        res.status(400).json({message:"something went wrong",success:false,err:err.message})
    }
}