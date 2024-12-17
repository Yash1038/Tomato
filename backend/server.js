import express from "express";
import cors from "cors"
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import 'dotenv/config.js'


// app config 
const app = express()
const port = 4000

// middleware
app.use(express.json())
app.use(cors())

// db connnection

connectDB();

// api endpoint
app.use("/api/food", foodRouter)  /// This is to upload the images
app.use("/images", express.static('uploads')) // now here all those images can be accessed. So when we acess localhost.../images/filename it whill show those 
app.use("/api/user", userRouter)
app.use("/api/cart", cartRouter)
app.use("/api/order", orderRouter)


app.get("/", (req, res)=>{
    res.send("API Working")
})

app.listen(port, ()=>{
    console.log(`Server Started on http://localhost:${port}`)
})

// mongodb+srv://DineZone:DineZone1029@cluster0.oyehofn.mongodb.net/?