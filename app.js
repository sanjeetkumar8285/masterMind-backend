const express=require('express');
const app=express();
const cors=require("cors");
require('dotenv').config();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use("/uploads",express.static("uploads"))


app.use("/",require('./router/user'))
app.use("/admin",require('./router/admin'))
app.use("/property",require("./router/property"))
const port=process.env.PORT || 5000
app.listen(port,(err)=>{
    if(err){
        console.log(`Error in server creation ${err}`)
    }
    else{
        console.log(`Server is up and running on port ${port}`)
    }
})
