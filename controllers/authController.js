import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import usermodel from "../models/usermodel.js";
import  Jwt  from "jsonwebtoken";

export const registerController = async (req,res) => {
    try {
        const {name,email,password,phone,address,answer} = req.body
            //validations
            if(!name){
                return res.send({message:"Name is Required"});
            }
            if(!email){
                return res.send({message:"Email is Required"});
            }
            if(!password){
                return res.send({message:"Password is Required"});
            }
            if(!phone){
                return res.send({message:"Phone number is Required"});
            }
            if(!address){
                return res.send({message:"Address is Required"});
            }
            if(!answer){
                return res.send({message:"Answer is Required"});
            }
            
            //check user
            const existingUser = await usermodel.findOne({email});
            //existing User
            if(existingUser){
                return res.status(200).send({
                    success:false,
                    message:"Already Register please login",
                });
            }
                //register user
                const hashedPassword = await hashPassword(password);
                 //save
                 const user =await new usermodel({
                    name,
                    email,
                    phone,
                    address,
                    password: hashedPassword,
                    answer
                }).save();

                 res.status(201).send({
                    success:true,
                    message:"user register successfully",
                    user,
                    
                 });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in Registeration",
            error
        });
    }
};

//POST LOGIN
export const loginController = async(req,res) => {
    try {
        const {email,password} = req.body
        //validation
        if(!email || !password){
            return res.status(404).send({
                success:false,
                message:"Invalid email or password"
            })
        }
        //check user
        const user =await usermodel.findOne({email})
        if(!user){
            return res.status(404).send({
                success:false,
                message:"Email is not registered"
            })
        }

        const match = await comparePassword(password,user.password)
        if(!match){
            return res.status(200).send({
                success:false,
                message:"Invalid Password"
            })
        }
        //token
        const token = await Jwt.sign({_id:user._id}, process.env.JWT_SECRET,{
            expiresIn:"7d",
        });
        res.status(200).send({
            success:true,
            message:"login successfully",
            user:{
                name:user.name,
                email:user.email,
                phone:user.phone,
                address:user.address,
                role:user.role,

            },
            token,
        })
    } catch (error) {
       consol.log(error)
       res.status(500).send ({
        success:false,
        message:"error in login",
        error
       });
    }
};

//forgotPasswordController

export const forgotPasswordController = async (req,res) => {
    try {
        const {email,answer, newPassword} = req.body
        if(!email){
            res.status(400).send({message:"email is required"})
        }
        if(!answer){
            res.status(400).send({message:"answer is required"})
        }
        if(!newPassword){
            res.status(400).send({message:"New Password is required"})
        }
        //check
        const user = await usermodel.findOne({email,answer})
        //validation
        if(!user){
            return res.status(404).send({
                success:false,
                message:"Wrong Email Or Answer"
            });
        }
        const hashed= await hashPassword(newPassword)
        await usermodel.findByIdAndUpdate(user._id,{password:hashed})
        res.status(200).send({
            success: true,
            message: "Password Reset Successfully",
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Something went wrong",
            error
        });
    }
};

//test  controller
export const testController = (req, res) => {
    try{
    res.send("protected Route");
    }
    catch(error) {
        console.log(error);
        res.send({ error });

    };
};

export default{ registerController };