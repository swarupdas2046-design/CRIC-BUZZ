import bcrypt from 'bcrypt'
import mongoose from 'mongoose'
import { ROLES } from '../constant/app.constant.js'

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, enum: Object.values(ROLES), default: ROLES.SCORER },
    refreshToken: { type: String },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
)


userSchema.pre("save", function () {
  if (!this.isModified("password")) return;

  this.password = bcrypt.hashSync(this.password, 10);
});

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};


export const UserModel = mongoose.model('User', userSchema)   
