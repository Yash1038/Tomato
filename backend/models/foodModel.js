import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    name: {type: String, required:true},
    description: {type: String, required:true},
    price: {type: Number, required:true},
    image: {type:String, required:true}, 
    category: {type:String, required:true}
})

const foodModel = mongoose.models.food || mongoose.model("food", foodSchema);  // if it is already there, it will use, else it will create a new model

export default foodModel;