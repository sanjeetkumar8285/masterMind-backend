const express=require('express');
const app=express();
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use("/",require('./router/user'))

const port=process.env.PORT || 5000
app.listen(port,(err)=>{
    if(err){
        console.log(`Error in server creation ${err}`)
    }
    else{
        console.log(`Server is up and running on port ${port}`)
    }
})
