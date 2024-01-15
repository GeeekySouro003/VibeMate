import userModel from "../Models/Usermodel.js";
import bcrypt from 'bcrypt';

export const regUser=async(req,res) =>{
    const{username,password,firstname,middlename,lastname} = req.body;

    const salt=await bcrypt.genSalt(10); //salt is basically for hashing the password
    const hashedpwd=await bcrypt.hash(password,salt);

    const newUser=new userModel({username,password:hashedpwd,firstname,middlename,lastname});

    try{
        await newUser.save();
        res.status(200).json(newUser);

    }
    catch(err)
    {
        res.status(500).json({meessage:err.meessage});

    }
};


export const logUser=async(req,res) =>{
    const{username,password}=req.body;

    try{
        const user=await userModel.findOne({username});

        if(user)
        {
            const validation=await bcrypt.compare(password,user.password)
            validation?res.status(200).json(user):res.status(400).json("Password does not match");
        }
        else{
            res.status(404).json("User not registered");
        }

    }
    catch(err)
    {
       res.status(500).json({message:err.message})

    }
}