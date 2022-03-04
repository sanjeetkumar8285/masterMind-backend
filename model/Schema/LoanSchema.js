const mongoose=require("../conn");
const Schema=mongoose.Schema;
const loanSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    loanType:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    }

},{timestamps:true})

const loandModel=mongoose.model('LoanRequest',loanSchema);
module.exports=loandModel;