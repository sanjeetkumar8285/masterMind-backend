const amenitiesModel=require("../model/Schema/AmenitiesSchema")

module.exports.addAmenities=async(req,res)=>{
try{
const {name,status}=req.body
const amenities=new amenitiesModel({
    userId:req.user._id,
    name,
    status
})
const data=await amenities.save();
res.status(201).json({message:"Amenities Created Successfully",success:true,data})
}catch(err){
    res.status(400).json({message:"something went wrong",success:false,err:err.message})
}
}

module.exports.getAmenities=async(req,res)=>{
    try{
const keyword=req.query.keyword ?
        {
            name:{
                $regex:req.query.keyword,
                $options:"i"
            }
        }:{}
        const data=await amenitiesModel.find({...keyword}).sort({'createdAt':-1})
        res.status(200).json({message:"amenities retreived",success:true,data})
    }catch(err){
        res.status(400).json({message:"something went wrong",success:false,err:err.message})
    }
}
module.exports.updateAmenities=async(req,res)=>{
    try{
        const id=req.params.id;
        const {name,status}=req.body
        const amenities=await amenitiesModel.findById(id)
        if(!amenities){
            return res.status(400).json({message:"Amenities with this id doesn't exist",success:false})
        }
        const data=await amenitiesModel.findByIdAndUpdate(id,{
            name,
            status
        },{new:true})
        
        res.status(200).json({message:"Amenities data Updated",success:true,data})
    }catch(err){
        res.status(400).json({message:"something went wrong",success:false,err:err.message})
    }
}
module.exports.deleteAmenities=async(req,res)=>{
        try{
            const id=req.params.id;
            const amenities=await amenitiesModel.findById(id)
            if(!amenities){
                return res.status(400).json({message:"amenities with this id doesn't exist",success:false})
            }
            const data=await amenities.remove();
            res.status(200).json({message:"Amenities data deleted",success:true,data})
    }catch(err){
        res.status(400).json({message:"something went wrong",success:false,err:err.message})
    }
}