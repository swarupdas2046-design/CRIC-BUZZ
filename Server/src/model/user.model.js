import { Schema, model } from "mongoose";
import { ROLES } from "../constant/model.constant.js";

const userSchema = new Schema({
    name:{type: String, required: true, trim: true},
    email:{type: String, required: true, trim: true, unique: true, lowercase: true },
    password:{type: String },
    role:{type: String, enum: Object.values(ROLES), default: ROLES.SCORER },
    isDeleted:{type: Boolean, default: false},
    picture : {
        type: String,
        default : "https://www.istockphoto.com/photos/user-profile"
    }
},{timestamps: true})
 
const userModel = model("User", userSchema )

export default userModel;