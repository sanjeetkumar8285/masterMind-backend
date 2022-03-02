const amenitiesModel=require("../model/Schema/AmenitiesSchema")
const fs=require('fs');
const path=require('path')
module.exports.addAmenities=async(req,res)=>{
try{
const {name,status}=req.body
const amenities=new amenitiesModel({
    userId:req.user._id,
    name,
    image:req.file ? req.file.filename: "",
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
    const {page}=req.query
    const limit=20;
    const startIndex=(Number(page)-1)*limit
    const total=await amenitiesModel.countDocuments();
    const amenities=await amenitiesModel.find().sort({_id:-1}).limit(limit).skip(startIndex)
    res.status(200).json({data:amenities,currentPage:Number(page),numberofPage:Math.ceil(total/limit)})
    }catch(err){
    console.log(err)
    res.status(400).json({message:"something went wrong",success:false,err:err.message})
    }
    }

module.exports.searchAmenities=async(req,res)=>{
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
        if(req.file){
            fs.unlink(path.join(__dirname,'../uploads/'+amenities.image),(err,file)=>{
                if(err){
                    console.log('unlink failed '+err)
                }
            })
          }
        const data=await amenitiesModel.findByIdAndUpdate(id,{
            name,
            image:req.file ? req.file.filename :amenities.image,
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
            if(amenities.image){
              fs.unlink(path.join(__dirname,'../uploads/'+amenities.image),(err,file)=>{
                  if(err){
                      console.log('unlink failed '+err)
                  }
              })
            }
            const data=await amenities.remove();
            res.status(200).json({message:"Amenities data deleted",success:true,data})
    }catch(err){
        res.status(400).json({message:"something went wrong",success:false,err:err.message})
    }
}