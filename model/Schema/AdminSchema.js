const mongoose = require("../conn")
const jwt=require('jsonwebtoken')
const Schema = mongoose.Schema;
const adminSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
    
}, { timeStamps: true })


adminSchema.methods.generateToken=async function(){
    try{
        const token=jwt.sign({id:this._id},process.env.jwtSecretKey)
        return token;
    }catch(err){
        console.log(err)
    }

}



const adminModel = mongoose.model('admin', adminSchema)
module.exports = adminModel;

