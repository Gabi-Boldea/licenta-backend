import {Request, Response} from "express";
import User from "../models/user";

const getCurrentUser = async (req: Request, res: Response) => {
    try{
        const currentUser = await User.findOne({ _id: req.userId });
        if(!currentUser){
            return res.status(404).json({message:"User not found"});
        }
        res.json(currentUser);
    }catch(error){
        console.log(error);
        res.status(500).json({message:"Error getting user"});
    }
};

const createCurrrentUser = async (req: Request, res: Response) => {
    //1. Check if the user already exists in the database
    try{
        const {auth0Id} = req.body;
        const existingUser = await User.findOne({auth0Id});
        if(existingUser){
            return res.status(200).send;
        }
        //2. If the user does not exist, create a new user
        const newUser = new User(req.body);
        await newUser.save();
        //3. Return the user
        res.status(201).json(newUser.toObject());
    }catch(error){
        console.log(error);
        res.status(500).json({message:"Error creating the user"});
    }
};

const updateCurrentUser = async (req: Request, res: Response) => {
    try{
        const{name, phoneNumber, addressLine1, addressLine2, city, county, country, postalCode} = req.body;
        const user = await User.findById(req.userId);
        //verificam daca userul exista
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        //daca exista, actualizam datele userului
        user.name = name;
        user.phoneNumber = phoneNumber;
        user.addressLine1 = addressLine1;
        user.addressLine2 = addressLine2;
        user.city = city;
        user.county = county;
        user.country = country;
        user.postalCode = postalCode;
        await user.save();
        res.send(user);
    }catch(error){
        console.log(error);
        res.status(500).json({message:"Error updating user"});
    };
};

export default {
    getCurrentUser,
    createCurrrentUser, 
    updateCurrentUser
};