import jwt from "jsonwebtoken";
import 'dotenv/config'
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      role: user.role, //either user or admin
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

export default generateToken;