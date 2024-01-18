import mongoose from "mongoose";

const PostSchema = mongoose.Schema(
    {
        profileId:{type:String,required:true},
        desc:String,
        likes:[],
        comment:String,
        image:String,
    },
    {
        timestamps:true
    }
    );
var Postmodel=mongoose.model("Posts",PostSchema);
export default Postmodel;
