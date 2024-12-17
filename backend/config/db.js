import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://DineZone:DineZone1029@cluster0.oyehofn.mongodb.net/Dine-Zone').then(()=>console.log("DB Connected"));
}