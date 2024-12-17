import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from "validator"


// login user

const loginUser = async(req,res) => {
    const {email, password} = req.body;
    try{
      const user = await userModel.findOne({email})

      if(!user){
        return res.json({success:false, message:"User does not exist"})
      }

      // now checking password
      const isMatch = await bcrypt.compare(password, user.password);

      if(!isMatch){
        return res.json({success:false, message:"Invalid Credentials"})
      }

      const token = createToken(user._id);
      res.json({success:true, token})
    }catch (error){
        console.log(error);
        res.json({success:false, message:"Failed to login"})
    }
}

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET)
}

// registering user

const registerUser = async(req, res) => {
    const {name, password, email} = req.body;
    try{
        const exists = await userModel.findOne({email}) // if that email is already there
        if(exists){
            return res.json({success:false, message:"User already Exists"})
        }

        // validating for email format, and checking for strong password
        if(!validator.isEmail(email)){
            return res.json({success:false, message:"Please Enter Valid Email ID"})
        }

        if(password.length < 8){
            return res.json({success:false, message:"Please Enter Strong Password"})
        }

        // Now since all are valid, now we can create the account

        // Hashing user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name: name, 
            email: email,
            password: hashedPassword,
        })

        const user = await newUser.save()
        const token = createToken(user._id)
        res.json({success:true, token});

    } catch {
        console.log(error)
        res.json({success:false, message:"error in registring user"})
    }
}

export {loginUser, registerUser}