import UserModel from "../Models/userModel.js";
import bcrypt from 'bcrypt';

export const register = async (req, res) => {
    const {email, password, firstName, lastName} = req.body;
    if(!email || !password || !firstName || !lastName) return res.status(400).json({error: "all fields must be filled"});
    try{
        const userExists = await UserModel.findOne({email});
        if(userExists) return res.status(400).json({error: "this email is already in use"});
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);        
        const user = await UserModel.create({email, password: hashedPassword, firstName, lastName});
        res.status(200).json(user);
    }catch(e){
        res.status(400).json({error : e.message});
    }
}

export const login = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await UserModel.findOne({email});
        if(!user) return res.status(400).json({error: "no such user!"});
        const correctPassword = await bcrypt.compare(password, user.password);
        correctPassword ? res.status(200).json(user) : res.status(400).json({error: "incorrect password"});
    } catch (error) {
        res.status(400).json({error: error.message});       
    }
}