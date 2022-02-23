const mongoose=require('../conn');
const Schema=mongoose.Schema;
const propertyStatusSchema=new Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"admin"
    },
    name:{
        type:String,
        required:true
    },
    status:{
        type:Boolean,
        default:true
    }
},{timestamps:true})

const propertyStatusModel=mongoose.model('propertyStatus',propertyStatusSchema)
module.exports=propertyStatusModel