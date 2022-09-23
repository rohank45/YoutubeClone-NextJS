import dbConnect from "../../mongoose";
import User from "../../models/user";

module.exports = async () => {
  console.log("Creating admin user!");
  const adminUser = {
    firstName: "admin",
    lastName: "admin",
    email: "admin@admin.com",
    password: "SuperPass@12",
    role: "ADMIN",
    createdAt: new Date(Date.now()).toISOString(),
    updatedAt: new Date(Date.now()).toISOString(),
  };

  await User.create(adminUser);
};
