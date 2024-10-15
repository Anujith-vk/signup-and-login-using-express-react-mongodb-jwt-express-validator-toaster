const user=require('../schema/schema')
const jwt=require('jsonwebtoken')
const {body,validationResult}=require('express-validator')


const check = [
    body('email')
        .isEmail().withMessage("Enter a valid email"),
    
    body('password')
        .isLength({ min: 5, max: 8 }).withMessage("Password must be between 5 and 8 characters long")
];



const register=async function (req,res) {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const{name,email,password}=req.body
        const finduser=await user.findOne({email})
        if(finduser)
        {
            res.send({message:'user already exist'})
        }
        else
        {
            const newuser=await user.create(req.body)
            res.send({message:"Account created successfully",user:newuser})
        }
    } catch (error) {
        res.send({message:"error",error})
    }
}

const login=async function (req,res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const{name,email,password}=req.body;
        const finduser=await user.findOne({email})
        if(!finduser)
        {
            res.send({message:"user does not exist"})
        }
        else
        {
            if(password===finduser.password)
            {
                const token=jwt.sign({_id:finduser.id,},"secretkey",{expiresIn:'1m'})
                res.send({message:"login successfulll",user:finduser,token})
            }
            else
            {
                res.send({message:"incorrect password"})
            }
        }
    } catch (error) {
        res.send({message:error.message})
    }
}

const validate=(req,res,next)=>{
    const authheader=req.headers.authorization;
    if(!authheader)
    {
        res.send({message:"no token provided"})
    }
    else
    {
        const token=authheader.split(" ")[1]
        jwt.verify(token,"secretkey",(err,data)=>{
            if(err){
              return  res.send({message:"Access denied"})
            }
            else
            {
                userId=data;
                next();
            }

        })
    }

}

const dashboard = async function(req, res) {
    try {
        const userData = await user.findById(userId);
        if (!userData) {
            return res.send({ message: "User not found" });
        }
        res.send({ message: "Welcome", user: userData });
    } catch (error) {
        res.send({ message: "Error retrieving user data", error });
    }
};



module.exports={
    register,
    login,
    validate,
    dashboard,
    check
}