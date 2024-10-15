const express=require('express');
const { register, login, validate, dashboard, check } = require('../controller/controller');
const route=express.Router();

route.post('/',check,register)
route.post('/login',check,login)
route.get('/dashboard',validate,dashboard)
module.exports=route;