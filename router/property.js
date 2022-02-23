const express=require('express')
const router=express.Router();
const propertyModel=require("../model/Schema/propertySchema")
router.get("/propertyDetail/:id",async(req,res)=>{
    try{
const id=req.params.id
const property=await propertyModel.findById(id)
if(!property){
return res.status(400).json({message:"Property with this id doesn't exist",success:false})
}else{
    res.status(200).json({message:"Property details retrieved",success:true,data:property})
}
    }catch(err){
res.status(400).json({message:"Something went wrong",success:false,err:err.message})
    }
})

module.exports=router