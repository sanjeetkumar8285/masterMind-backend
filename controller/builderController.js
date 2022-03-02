const builderModel=require("../model/Schema/builderSchema");

module.exports.addBuilder=async(req,res)=>{
try{
const {builderName,contactNo,about,status}=req.body
const builder=new builderModel({
    userId:req.user._id,
    builderName,
    contactNo,
    about,
    status
})
const data=await builder.save();
res.status(200).json({message:"Builder added Successfully",success:true,data})
}catch(err){
    res.status(400).json({message:"Something went wrong",success:false,err:err.message})
}
}

module.exports.getBuilder=async(req,res)=>{
    try{
    const {page}=req.query
    const limit=20;
    const startIndex=(Number(page)-1)*limit
    const total=await builderModel.countDocuments();
    const builder=await builderModel.find().sort({_id:-1}).limit(limit).skip(startIndex)
    res.status(200).json({data:builder,currentPage:Number(page),numberofPage:Math.ceil(total/limit)})
    }catch(err){
    console.log(err)
    res.status(400).json({message:"something went wrong",success:false,err:err.message})
    }
    }

module.exports.searchBuilder=async(req,res)=>{
    try{
        const keyword=req.query.keyword ? 
        {
            sellerName:{
                $regex:req.query.keyword,
                $options:"i"
            }
        }:{}
        const data=await builderModel.find({...keyword}).sort({"createdAt":-1})
        res.status(200).json({message:"Builder details retrieved",success:true,data})
            }catch(err){
                res.status(400).json({message:"Something went wrong",success:false,err:err.message})
            }
}

module.exports.deleteBuilder=async(req,res)=>{
    try{
        const id=req.params.id
        const builder=await builderModel.findById(id)
        if(!builder){
            return res.status(400).json({message:"Builder with this id doesn't exist",success:false})
        }
        const data =await builder.remove()
        res.status(200).json({message:"Builder deleted successfully",success:true,data})
        
            }catch(err){
                res.status(400).json({message:"Something went wrong",success:false,err:err.message})
            }
}

module.exports.updateBuilder=async(req,res)=>{
    try{
        const id=req.params.id
        const {builderName,contactNo,about,status}=req.body
        const builder=await builderModel.findById(id)
        if(!builder){
            return res.status(400).json({message:"Builder with this id doesn't exist",success:false})
        } 
const data=await builderModel.findByIdAndUpdate(id,{
builderName,
contactNo,
about,
status
},{new:true})
res.status(200).json({message:"Builder Details Updated Successfully",success:true,data})
    }catch(err){
        res.status(400).json({message:"Something went wrong",success:false,err:err.message})
    }
}