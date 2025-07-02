import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/users");

const userSchema = new mongoose.Schema({ login: String, password: String });
const User = mongoose.models.User || mongoose.model("User", userSchema, "user_login");

async function registerUser(login, password) {
  const existingUser = await User.findOne({ login });
  if (existingUser) {
    throw new Error("Пользователь с таким логином уже существует");
  }
  const newUser = new User({ login, password });
  await newUser.save();
  return newUser;
}

export { registerUser };
