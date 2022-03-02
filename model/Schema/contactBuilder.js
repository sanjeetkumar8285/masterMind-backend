const mongoose=require("../conn");
const Schema=mongoose.Schema;
const contactBuilderSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    message:{
        type:String,
        required:true
    }
},{timestamps:true})

const contactBuilderModel=mongoose.model("contactBuilder",contactBuilderSchema);
module.exports=contactBuilderModel