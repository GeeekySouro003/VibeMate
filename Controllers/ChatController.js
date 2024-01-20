import Chatmodel from "../Models/ChatModel";


export const crtChat=async(req,res) => {
    const newChat=new Chatmodel ({
        members:[req.body.senderId,req.body.recieveId],
    });

    try{
        const result = await newChat.save();
        res.status(200).json(result);

    }
    catch(err)
    {
       res.status(500).json(err);
    }
}


export const userChat=async(req,res) => {
    try{
        const Chat=await Chatmodel.find({
            members: { $in: [req.params.userId]}
        });
        res.status(200).json(Chat);
    }
    catch(err) {
        res.status(500).json(err);
    }
}

