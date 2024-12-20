import Message from "../models/Message.js";

export const sendMessage = async (req, res) => {
  const { senderId, receiverId, content } = req.body;
  try {
    const newMessage = await Message.create({ senderId, receiverId, content });
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getMessages = async (req, res) => {
  const { userId1, userId2 } = req.query;
  try {
    const messages = await Message.find({
      $or: [
        { senderId: userId1, receiverId: userId2 },
        { senderId: userId2, receiverId: userId1 },
      ],
    });
    res.status(200).json(messages);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
