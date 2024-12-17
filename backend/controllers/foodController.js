import foodModel from "../models/foodModel.js";
import fs from 'fs'

// add food item

const addFood = async (req, res) => {

    let image_filename = `${req.file.filename}`

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename
    })

    try {
        await food.save();
        res.json({success: true, message: "Food added"})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: "Error in adding food"}) 
    }

}

// Getting All food list 

const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({}); // This is our datastructure, here we ll get all of them
        res.json({success: true, data:foods})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error in getting food list"})
    }
}


// Removing food Item

const removeFood = async(req, res) => {
    try {
        // First find the food item
        const food = await foodModel.findById(req.body.id); // This is used to find the food model
        fs.unlink(`uploads/${food.image}`, ()=>{})  // This is used to delete the image in our disk

        await foodModel.findByIdAndDelete(req.body.id);  // Now this is removing it
        res.json({success:true, message:"Food Removed"})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error in Removing Food"})
    }
}

export {addFood, listFood, removeFood}