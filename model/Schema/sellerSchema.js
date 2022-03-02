const mongoose=require("../conn");
const Schema=mongoose.Schema;
const sellerSchema=new Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"admin"
    },
    sellerName:{
        type:String,
        required:true
    },
    contactNo:{
        type:Number,
        required:true
    },
    dealsIn:{
        type:String,
        required:true
    },
    areaOfOperation:{
        type:String,
        required:true
    },
    about:{
        type:String,
        required:true
    },
    status:{
        type:Boolean,
        required:true
    }
},{timestamps:true})

const sellerModel=mongoose.model('sellerDetail',sellerSchema);
module.exports=sellerModel