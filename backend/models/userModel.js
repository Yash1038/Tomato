import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true, unique:true},  // Soo we ll have only unique emails
    password:{type:String, required:true},
    cartData:{type:Object, default:{}} // Here we are creating empty cart 
}, {minimize:false})  // This minimize is to ensure that cartData is also created even though we are initialising it as empty

const userModel = mongoose.models.user || mongoose.model("user", userSchema); // If it already exists, then nothing, otherwise it creates one scheme

export default userModel;