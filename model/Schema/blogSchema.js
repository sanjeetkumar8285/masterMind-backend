const mongoose=require('../conn');
const Schema= mongoose.Schema;
const blogSchema=new Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"admin"
    },
    blogName:{
        type:String,
        required:true
    },
    blogDescription:{
        type:String,
        required:true
    },
    image:{
        type:String
    },
    status:{
        type:Boolean,
        default:true
    }
},{timestamps:true})

const blogModel=mongoose.model("blog",blogSchema)
module.exports=blogModel