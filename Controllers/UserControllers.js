import userModel from "../Models/Usermodel.js";

export const getUser = async(req,res) =>{
    const id=req.params.id;

    try{
        const user=await userModel.findById(id);
        if(user)
        {
            const{password,...otherDetails} = user._doc;
            res.status(200).json(otherDetails);
        }
        else{
            res.status(404).json("No such user exists");
        }

    }
    catch(err){
        res.status(500).json(err);
    }

};