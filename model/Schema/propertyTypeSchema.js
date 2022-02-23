const mongoose=require('../conn');
const Schema=mongoose.Schema;
const propertyTypeSchema=new Schema({
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

const propertyTypeModel=mongoose.model('propertyType',propertyTypeSchema)
module.exports=propertyTypeModel