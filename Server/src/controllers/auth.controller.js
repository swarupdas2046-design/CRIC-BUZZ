import { UserModel } from "../models/auth.models.js";
import { generateAccessToken, generateRefreshToken } from "../utils/token.js";


export const UserRegister = async(req, res) => {
    try {
            const { name, email, password, role} = req.body

    
    let existingUser = await UserModel.findOne({ email });

    if (existingUser)
      return res.status(409).json({
        message: "user already registered",
      });

    let newUser = await UserModel.create({
      name,
      email,
      password,
      role,
    });

    let accessToken = generateAccessToken(newUser._id);
    let refreshToken = generateRefreshToken(newUser._id);

    newUser.refreshToken = refreshToken;
    await newUser.save();

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      // secure:true
      // sameSite:"strict"
      maxAge: 15 * 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      // secure:true
      // sameSite:"strict"
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      message: "User registered Successfully",
      user: newUser,
    });


    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}