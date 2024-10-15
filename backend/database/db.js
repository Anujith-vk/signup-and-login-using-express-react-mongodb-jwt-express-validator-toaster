const mongoose=require('mongoose')
mongoose.connect('mongodb://localhost:27017/sign_login')
.then(()=>{
    console.log("database connected successfully");
})
.catch(()=>{
    console.log("failed to connect the database");
})
module.exports=mongoose; 