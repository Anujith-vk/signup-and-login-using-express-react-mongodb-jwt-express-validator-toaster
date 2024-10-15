const express=require('express')
const app=express()
const port=3000
const cors=require('cors')
const routes=require('./routes/api')
const mongoose=require('./database/db')

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/',routes)

app.listen(port,(req,res)=>{
    console.log(`server listening at http://localhost:${port}`);
})