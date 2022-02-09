const mongoose = require("../conn")
const jwt=require('jsonwebtoken')
const Schema = mongoose.Schema;
const userSchema = new Schema({
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
    },
    phone: {
        type: Number,
        required: true
    },
    userType: {
        type: String,
        enum:['agent','builder','individual'],
        default: "individual"
    },
    city: {
        type: String,
        required: true
    },
    interestedIn: {
        type: Array

    },
    dealsIn: {
        type: Array
    },
    companyName: {
        type: String
    }

}, { timeStamps: true })


userSchema.methods.generateToken=async function(){
    try{
        const token=jwt.sign({id:this._id},process.env.jwtSecretKey)
        return token;
    }catch(err){
        console.log(err)
    }

}



const userModel = mongoose.model('user', userSchema)
module.exports = userModel;

