const mongoose=require("../conn");
const Schema=mongoose.Schema;
const builderSchema=new Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    builderName:{
        type:String,
        required:true
    },
    contactNo:{
        type:Number,
        required:true
    },
    about:{
        type:String,
        required:true
    },
    status:{
        type:Boolean,
        default:true
    }
},{timestamps:true})

const builderModel=mongoose.model('builderDetails',builderSchema);
module.exports=builderModel;