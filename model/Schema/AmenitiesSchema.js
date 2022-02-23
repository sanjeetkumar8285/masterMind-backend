const mongoose=require('../conn');
const Schema= mongoose.Schema;
const amenitiesSchema=new Schema({
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

const amenitiesModel=mongoose.model('amenities',amenitiesSchema)
module.exports=amenitiesModel