const sellerModel=require("../model/Schema/sellerSchema");
module.exports.addSeller=async(req,res)=>{
try{
const {sellerName,contactNo,dealsIn,areaOfOperation,about,status}=req.body
const seller=new sellerModel({
    userId:req.user._id,
    sellerName,
    contactNo,
    dealsIn,
    areaOfOperation,
    about,
    status
})
const data=await seller.save();
res.status(201).json({message:"Seller Added Successfully",success:true,data})
}catch(err){
    res.status(400).json({message:"Something went wrong",success:false,err:err.message})
}
}

module.exports.getSeller=async(req,res)=>{
    try{
    const {page}=req.query
    const limit=20;
    const startIndex=(Number(page)-1)*limit
    const total=await sellerModel.countDocuments();
    const seller=await sellerModel.find().sort({_id:-1}).limit(limit).skip(startIndex)
    res.status(200).json({data:seller,currentPage:Number(page),numberofPage:Math.ceil(total/limit)})
    }catch(err){
    console.log(err)
    res.status(400).json({message:"something went wrong",success:false,err:err.message})
    }
    }

module.exports.searchSeller=async(req,res)=>{
    try{
const keyword=req.query.keyword ? 
{
    sellerName:{
        $regex:req.query.keyword,
        $options:"i"
    }
}:{}
const data=await sellerModel.find({...keyword}).sort({"createdAt":-1})
res.status(200).json({message:"Seller details retrieved",success:true,data})
    }catch(err){
        res.status(400).json({message:"Something went wrong",success:false,err:err.message})
    }
}

module.exports.deleteSeller=async(req,res)=>{
    try{
const id=req.params.id
const seller=await sellerModel.findById(id)
if(!seller){
    return res.status(400).json({message:"Seller with this id doesn't exist",success:false})
}
const data =await seller.remove()
res.status(200).json({message:"Seller deleted successfully",success:true,data})

    }catch(err){
        res.status(400).json({message:"Something went wrong",success:false,err:err.message})
    }
}

module.exports.updateSeller=async(req,res)=>{
    try{
        const id=req.params.id
        const {sellerName,contactNo,dealsIn,areaOfOperation,about,status}=req.body
        const seller=await sellerModel.findById(id)
        if(!seller){
            return res.status(400).json({message:"Seller with this id doesn't exist",success:false})
        } 
const data=await sellerModel.findByIdAndUpdate(id,{
sellerName,
contactNo,
dealsIn,
areaOfOperation,
about,
status
},{new:true})
res.status(200).json({message:"Seller Updated Successfully",success:true,data})
    }catch(err){
        res.status(400).json({message:"Something went wrong",success:false,err:err.message})
    }
}