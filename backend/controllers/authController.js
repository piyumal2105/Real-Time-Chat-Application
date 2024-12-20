import User from "../models/User.js";

export const registerUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const newUser = await User.create({ username, password });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username, password });
    if (!user) throw new Error("Invalid credentials");
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
