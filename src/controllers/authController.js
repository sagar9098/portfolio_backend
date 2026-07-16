import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const createToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  return res.json({
    token: createToken(user._id),
    user: {
      id: user._id,
      name: user.name,
      email: user.email
    }
  });
};

export const profile = async (req, res) => {
  res.json(req.user);
};
