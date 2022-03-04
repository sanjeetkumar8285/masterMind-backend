const loandModel=require("../model/Schema/LoanSchema");

module.exports.postLoan=async(req,res)=>{
    try{
const {name,email,phone,loanType,message}=req.body
const loan=new loandModel({
    name,
    email,
    phone,
    loanType,
    message
})
const data=await loan.save()
res.status(201).json({message:"Your request for loan Submitted Successfully",success:true,data});
    }catch(err){
        res.status(400).json({message:"Something went wrong",success:false,err:err.message})
    }
}
module.exports.getLoan=async(req,res)=>{
try{
    const {page}=req.query
    const limit=20;
    const startIndex=(Number(page)-1)*limit
    const total=await loandModel.countDocuments();
    const loanData=await loandModel.find().sort({_id:-1}).limit(limit).skip(startIndex)
    res.status(200).json({data:loanData,currentPage:Number(page),numberofPage:Math.ceil(total/limit)})
}catch(err){
    res.status(400).json({message:"Something went wrong",success:false,err:err.message})
}
}

module.exports.searchLoan=async(req,res)=>{
    try{
    const keyword=req.query.keyword ? {
        name:{
            $regex:req.query.keyword,
            $options:"i"
        }
    }:{}
    const data=await loandModel.find({...keyword}).sort({"createdAt":-1})
    res.status(200).json({message:"All Data Retrieved",success:true,data})
    }catch(err){
        res.status(400).json({message:"Something went wrong",success:false,err:err.message})
    }
    }
module.exports.deleteLoan=async(req,res)=>{
    try{
        const id=req.params.id;
        const loan=await loandModel.findById(id);
        if(!loan){
  return res.status(400).json({message:"Data with this id doesn't exist",success:true,data});
        }
    const data=await loan.remove();
    res.status(200).json({message:"Data Deleted Successfully",success:true,data})
    }catch(err){
        res.status(400).json({message:"Something went wrong",success:false,err:err.message})
    }
}