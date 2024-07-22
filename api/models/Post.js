import { Schema,model } from "mongoose";


const PostSchema = new Schema({
    title:String,
    summary:String,
    content:String,
    cover:String
},{
    timestamps:true
})

export const PostModel = model("Posts",PostSchema);