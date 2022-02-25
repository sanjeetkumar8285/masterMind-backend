const propertyModel=require("../model/Schema/propertySchema");

const path=require('path');
const fs=require('fs');

const fileHandler=function(err,data){
    if(err){
        console.log(`unlink failed ${err}`)
    }
}

module.exports.addProperty=async(req,res)=>{
    try{
const {name,propertyNo,propertyStatus,propertyType,price,about,sportsAndOutdoor,clubHouse,specifications,greenArea,fittingAndFurshing
    ,amenities,areaSize,areaSizePrefix,landArea,landAreaPrefix,bedroom,
    addressDetails,state,longitude,latitude,status}=req.body

    let propertyImages=[]
    if(req.files?.images){
        propertyImages=req.files.images.map((data)=>{
           return data.filename
        })
    }else{
        propertyImages=[]
    }
const property=new propertyModel({
    userId:req.user._id,
    name,
    propertyNo,
    propertyStatus,
    propertyType,
    price,
    about,
    rating:{
        sportsAndOutdoor,
        clubHouse,
        specifications,
        greenArea,
        fittingAndFurshing
    },
    amenities,
    description:{
        areaSize,
        areaSizePrefix,
        landArea,
        landAreaPrefix,
        bedroom
    },
    address:{
        state,
        addressDetails,
        longitude,
        latitude
    },
    brochureImage:req.files?.brochureImage ? req.files.brochureImage[0].filename : undefined,
    mapImage:req.files?.mapImage ? req.files.mapImage[0].filename : undefined,
    images:propertyImages,
    status
})
const data=await property.save();
res.status(201).json({message:"property added successfully",success:true,data})
    }
    catch(err){
    console.log(err)
        res.status(400).json({message:"Something went wrong",success:false,err:err.message})
    }
}
module.exports.getProperty=async(req,res)=>{
    try{
    const {page}=req.query
    const limit=20;
    const startIndex=(Number(page)-1)*limit
    const total=await propertyModel.countDocuments();
    const property=await propertyModel.find().sort({_id:-1}).limit(limit).skip(startIndex)
    res.status(200).json({data:property,currentPage:Number(page),numberofPage:Math.ceil(total/limit)})
    }catch(err){
    console.log(err)
    res.status(400).json({message:"something went wrong",success:false,err:err.message})
    }
    }

module.exports.searchProperty=async(req,res)=>{
    try{
    const keyword=req.query.keyword ? {
        name:{
            $regex:req.query.keyword,
            $options:"i"
        }
    } : {}
    const data=await propertyModel.find({...keyword}).sort({'createdAt':-1})
    res.status(200).json({message:"property retrived",success:true,data})
    }catch(err){
        res.status(400).json({message:"Something went wrong",success:false,err:err.message})
    }
    }

module.exports.deleteProperty=async(req,res)=>{
    try{
    const id=req.params.id
    const property=await propertyModel.findById(id)
    if(!property){
        return res.status(400).json({message:"property with this id doesn't exist",success:false,data})
    }
    if(property.brochureImage){
        fs.unlink(path.join(__dirname,'../uploads/'+property.brochureImage),fileHandler)
    }
    if(property.mapImage){
        fs.unlink(path.join(__dirname,'../uploads/'+property.mapImage),fileHandler)
    }
    if(property.images){
        property.images.map((data)=>{
            fs.unlink(path.join(__dirname,'../uploads/'+data),fileHandler)
        })
       const data=await property.remove();
       res.status(200).json({message:"property deleted successfully",success:true,data})
    }
    }catch(err){
        res.status(400).json({message:"Something went wrong",success:false,err:err.message})
    }
    }

module.exports.updateProperty=async(req,res)=>{
    try{
        const {name,propertyStatus,propertyType,propertyNo,price,about,sportsAndOutdoor,clubHouse,specifications,greenArea,fittingAndFurshing
            ,amenities, areaSize,areaSizePrefix,landArea,landAreaPrefix,bedroom,
            addressDetails,state,longitude,latitude,status}=req.body
        const id=req.params.id
        const property=await propertyModel.findById(id)
        if(!property){
            return res.status(400).json({message:"property with this id doesn't exist",success:false,data})
        }
        if(req.files.brochureImage){
            fs.unlink(path.join(__dirname,'../uploads/'+property.brochureImage),fileHandler)
        }
        if(req.files.mapImage){
            fs.unlink(path.join(__dirname,'../uploads/'+property.mapImage),fileHandler)
        }
        if(req.files.images){
            property.images.map((data)=>{
                fs.unlink(path.join(__dirname,'../uploads/'+data),fileHandler)
            })
        }
        let propertyImages;
        if(req.files.images){
            propertyImages=req.files.images.map((data)=>{
               return data.filename
            })
        }
        
        const data=await propertyModel.findByIdAndUpdate(id,{
    name,
    propertyNo,
    propertyStatus,
    propertyType,
    price,
    about,
 "rating.sportsAndOutdoor":sportsAndOutdoor,
 "rating.clubHouse":clubHouse,
 "rating.specifications":specifications,
"rating.greenArea":greenArea,
"rating.fittingAndFurshing":fittingAndFurshing,
    amenities,
"description.areaSize":areaSize,
"description.areaSizePrefix":areaSizePrefix,
"description.landArea":landArea,
"description.landAreaPrefix":landAreaPrefix,
"description.bedroom":bedroom,

"address.state":state,
"address.addressDetails":addressDetails,
"address.longitude":longitude,
"address.latitude":latitude,
brochureImage:req.files.brochureImage ? req.files.brochureImage[0].filename : property.brochureImage,
mapImage:req.files.mapImage ? req.files.mapImage[0].filename : property.mapImage,
images:propertyImages,
status
        },{new:true})
        res.status(200).json({message:"Property Updated Successfully",success:true,data})
    }catch(err){
        res.status(400).json({message:"Something went wrong",success:false,err:err.message})
    }
}