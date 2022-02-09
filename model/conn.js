const mongoose=require('mongoose');
mongoose.connect(process.env.URI,{ useNewUrlParser: "true", useUnifiedTopology: "true" },(err)=>{
    if(err){
        console.log(`Error in database connection`)
    }
    else{
        console.log("connected to database..")
    }
})
module.exports=mongoose