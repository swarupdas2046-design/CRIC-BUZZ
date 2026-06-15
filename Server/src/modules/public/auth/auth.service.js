import { email } from "zod";
import UserRepo from "../../../repository/user.repository.js"
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
import { generateAccessToken, generateRefreshToken } from "../../../shared/utils/token.js";
import { ConflictError, UnAuthorize } from "../../../shared/error/app.error.js";

export default class AuthService {

  constructor() {
    this.userRepo = new UserRepo();
  }

  async CreateUser(user) {
    const isUserPresent = await this.userRepo.findByEmail(user.emails[0].value);
    let result = isUserPresent;

    if(!isUserPresent) {
      const _user = await this.userRepo.create({
        email: user.emails[0].value,
        picture: user.photos[0].value,
        name: user.displayName
      });
      result = _user;
    }

    const data = {
      _id: result._id,
      email: user.emails[0].value,
      picture: user.photos[0].value,
      role: result.role,
      name: user.displayName 
    }
    const accessToken = generateAccessToken(data);
    const refreshToken = generateRefreshToken(data);

    return { accessToken, refreshToken };

  }

  async register(data) {
    const existingUser = await this.userRepo.findByEmail(data.email);

    if (existingUser) throw new ConflictError("Email already registered");

    const hashedPassword = await bcrypt.hash( data.password, 10);

    const user = await this.userRepo.create({ ...data, password: hashedPassword});

    return this.generateTokens(user);
  }

  async login(data) {
    const user = await this.userRepo.findByEmail( data.email );
    if (!user) throw new ( "User not found");
    
    const isMatch = await bcrypt.compare( data.password, user.password );
    if (!isMatch) throw new UnAuthorize( "Invalid credentials");
    

    return this.generateTokens(user);
  }

  generateTokens(user) {
    const data = {
      _id: user._id,
      email: user.email,
      picture: user.picture,
      role: user.role,
      name: user.name
    }

    const accessToken = generateAccessToken(data);
    const refreshToken = generateRefreshToken(data);

    return {
      user,
      accessToken,
      refreshToken,
    };
  }

}