import express from "express";
const router = express.Router();
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log("re.body:",req.body);
  const user = await User.findOne({ email }).select("+password");
  if (!user) return res.status(401).json({ message: "invalid Credentials" });
  console.log("user.password: ",user); 
  const match = await bcrypt.compare(password, user.password);

  if (!match) return res.status(401).json({ message: "invalid Credentials" });

  const token = generateToken(user);

  res.json({
    token,
    user: {
      id: user._id,
      name: user.name,
      role: user.role,
    },
  });
});

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "missing credentials" });
    }
    const alreadyExists = await User.findOne({ email });
    if (alreadyExists) {
        console.log("user:",alreadyExists);
      return res.status(409).json({ message: "user already exists" });
    }
    const hashpwd = await bcrypt.hash(password, 12);
    const user = await User.insertOne({ 
      name: name,
      email: email,
      password: hashpwd,
      role: role,
    });
    console.log("user created:",user);
    const token = generateToken(user);
    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err });
  }
});

export default router;
