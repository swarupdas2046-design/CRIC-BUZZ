import bcrypt from "bcrypt";
import logger from "../config/logger.js";
import UserRepo from "../repository/user.repository.js";

const userRepo = new UserRepo();

const seedSuperAdmin = async () => {
  const existing = await userRepo.findSuperAdmin();

  if (existing) { 
    logger.info("SUPER_ADMIN already exists");
    return;
  }

  const password = await bcrypt.hash(process.env.SUPER_ADMIN_PASSWORD, 10 );

  await userRepo.create({
    name: process.env.SUPER_ADMIN_NAME || "Super Admin",
    email: process.env.SUPER_ADMIN_EMAIL,
    password,
    role: "SUPER_ADMIN",
  });

  logger.info("SUPER_ADMIN created successfully");
};

export default seedSuperAdmin;