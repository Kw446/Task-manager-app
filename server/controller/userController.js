const express = require('express');
const userSchema = require('../model/userSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

exports.createUser=async(req,res)=>{
    try{
        const {name,email,password}=req.body;
        if(!name){
            return res.status(400).json({
                success:false,
                message:'Name are required'
            });
        } 
          if(!email){
            return res.status(400).json({
                success:false,
                message:'Email are required'
            });
        }  
        if(!/^\S+@\S+\.\S+$/.test(email)) {
            return res.status(400).json({
                success:false,
                message:'Invalid email format pleas proved a valid email address'
            });
        }
          if(!password){
            return res.status(400).json({
                success:false,
                message:'Password are required'
            });
        }  
        const salt= await bcrypt.genSalt(10);
        const hashedPassword= await bcrypt.hash(password,salt);
        const userData= new  userSchema({
            name,
            email,
            password:hashedPassword
        });
        await userData.save();

        const token=jwt.sign({id:userData._id},
            process.env.JWT_SECRET,{expiresIn:'1h'});

        res.status(201).json({
            success:true,
            message:'User created successfully',
            data:userData,
            access_token:token
        });

    }catch(err){
        res.status(500).json({
            success:false,
            message:'Failed to create user',
            error:err.message
        });
    }
}

exports.loginUser=async(req,res)=>{
    try{
        const {email,password}=req.body;
        if(!email){
            return res.status(400).json({
                success:false,  
                message:'Email is required'
            });
        }
        if(!password){
            return res.status(400).json({
                success:false,
                message:'Password is required'
            });
        }
        const userData= await userSchema.findOne({email});
        if(!userData){
            return res.status(404).json({
                success:false,
                message:'User not found please create an account'
            });
        }
        const isMatch= await bcrypt.compare(password,userData.password);
        if(!isMatch){
            return res.status(400).json({
                success:false,
                message:'Invalid password or email please try again'
            });
        }
        const token=jwt.sign({id:userData._id},
            process.env.JWT_SECRET,{expiresIn:'1h'});
        res.status(200).json({
            success:true,
            message:'Login successful',
            data:userData,
            access_token:token
        });
    }catch(err){
        res.status(500).json({
            success:false,
            message:'Failed to login',
            error:err.message
        });
    }
}

exports.getUserProfile=async(req,res)=>{
    try{
        const userId=req.params.id;
        const userData=await userSchema.findById(userId).select('-password');
        if(!userData){
            return res.status(404).json({
                success:false,
                message:'User not found'
            });
        }
        res.status(200).json({
            success:true,
            message:'User profile retrieved successfully',
            data:userData
        });
    }catch(err){
        res.status(500).json({
            success:false,
            message:'Failed to retrieve user profile',
            error:err.message
        });
    }
}

exports.updateUserProfile=async(req,res)=>{
    try{
        const userId=req.params.id;
        const {name,email,password}=req.body;
        const updateData={};
        if(name){
            updateData.name=name;
        }
        if(email){
            if(!/^\S+@\S+\.\S+$/.test(email)) {
                return res.status(400).json({
                    success:false,
                    message:'Invalid email format please provide a valid email address'
                });
            }
            updateData.email=email;
        }
        if(password){
            const salt= await bcrypt.genSalt(10);
            const hashedPassword= await bcrypt.hash(password,salt);
            updateData.password=hashedPassword;
        }
        const updatedUser= await userSchema.findByIdAndUpdate(userId,updateData,{new:true});
        if(!updatedUser){
            return res.status(404).json({
                success:false,
                message:'User not found'
            });
        }
        res.status(200).json({
            success:true,
            message:'User profile updated successfully',
            data:updatedUser
        });
    }catch(err){
        res.status(500).json({
            success:false,
            message:'Failed to update user profile',
            error:err.message
        });
    }

}

exports.deleteUser=async(req,res)=>{
    try{
        const userId=req.params.id;
        const deletedUser= await userSchema.findByIdAndDelete(userId);
        if(!deletedUser){
            return res.status(404).json({
                success:false,
                message:'User not found'
            });
        }
        res.status(200).json({
            success:true,
            message:'User deleted successfully'
        });
    }catch(err){
        res.status(500).json({
            success:false,
            message:'Failed to delete user',
            error:err.message
        });
    }
}
exports.getAllUsers=async(req,res)=>{
    try{
        const users= await userSchema.find().select('-password');
        res.status(200).json({
            success:true,
            message:'Users retrieved successfully',
            data:users
        });
    }catch(err){
        res.status(500).json({
            success:false,
            message:'Failed to retrieve users',
            error:err.message
        });
    }
}