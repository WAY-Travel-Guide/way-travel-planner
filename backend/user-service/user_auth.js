import mongoose from "mongoose";
mongoose.connect("mongodb://localhost:27017/users");

const userSchema = new mongoose.Schema({ login: String, password: String });
const User = mongoose.models.User || mongoose.model("User", userSchema, "user_login");

async function checkUser(login, password) {
  return await User.findOne({ login, password });
}

export { checkUser };

if (process.env.TEST_USER_AUTH) {
  (async () => {
    const user = await checkUser("22", "2222");
    console.log(user ? "User found:" : "User not found!", user);
    process.exit();
  })();
}