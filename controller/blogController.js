const blogModel=require("../model/Schema/blogSchema");
const path=require("path")
const fs=require('fs');

module.exports.addBlog=async(req,res)=>{
const {blogName,blogDescription,status}=req.body
try{
const blog=new blogModel({
    userId:req.user._id,
    blogName,
    blogDescription,
    image:req.file ? req.file.filename :"",
    status

})
const data=await blog.save();
res.status(201).json({message:"Blog Created Successfully",data,success:true})
}catch(err){
res.status(400).json({message:"Something went wrong",err:err.message,success:false})
}
}

module.exports.getBlog=async(req,res)=>{
    try{
    const {page}=req.query
    const limit=20;
    const startIndex=(Number(page)-1)*limit
    const total=await blogModel.countDocuments();
    const blog=await blogModel.find().sort({_id:-1}).limit(limit).skip(startIndex)
    res.status(200).json({data:blog,currentPage:Number(page),numberofPage:Math.ceil(total/limit)})
    }catch(err){
    console.log(err)
    res.status(400).json({message:"something went wrong",success:false,err:err.message})
    }
    }

module.exports.searchBlog=async(req,res)=>{
try{
const keyword=req.query.keyword ? 
{
    blogName:{
        $regex:req.query.keyword,
        $options:"i"
    }
}:{}
const data=await blogModel.find({...keyword}).sort({"createdAt":-1})
res.status(200).json({message:"Blog Details retrieved",data,success:true})
}catch(err){
    res.status(400).json({message:"Something went wrong",err:err.message,success:false})
}
}
module.exports.deleteBlog=async(req,res)=>{
try{
const id=req.params.id
const blog=await blogModel.findById(id)
if(!blog){
    return res.status(400).json({message:"Blog with this id doesn't Exist",success:false})
}
if(blog.image){
    fs.unlink(path.join(__dirname,"../uploads/"+blog.image),(err)=>{
        if(err){
            console.log("Unlink failed",err)
        }
    })
}

const data=await blog.remove();
res.status(200).json({message:"Blog Deleted Successfully",success:true,data})
}catch(err){
    res.status(400).json({message:"Something went wrong",err:err.message,success:false})
}
}

module.exports.updateBlog=async(req,res)=>{
    const id=req.params.id
    const {blogName,blogDescription,status}=req.body
    try{
        const blog=await blogModel.findById(id)
        if(!blog){
            return res.status(400).json({message:"Blog with this id doesn't Exist",success:false})
        }
        if(req.file){
            fs.unlink(path.join(__dirname,"../uploads/"+blog.image),(err)=>{
                if(err){
                    console.log("unlink failed"+err)
                }
            })
        }
        const data=await blogModel.findByIdAndUpdate(id,{
            blogName,
            blogDescription,
            image:req.file ? req.file.filename : blog.image,
            status
        },{new:true})
        res.status(200).json({message:"Blog Updated Successfully",data,success:false})
    }catch(err){
        res.status(400).json({message:"Something went wrong",err:err.message,success:false})
    }
}