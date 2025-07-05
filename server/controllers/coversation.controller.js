const Conversation = require("../models/conversation.model");
const genai = require("@google/genai").GoogleGenAI;

const getConversation = async (req, res) => {
  try {
    const { userId } = req.params;
    
    const conversation = await Conversation.find({userId});
    return res.status(200).json({
      success: true,
      data: conversation,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "error fetching messages",
      error: err.message,
    });
  }
};

const sendMessage = async (req, res) => {
  try {
    const { userId, text } = req.body;

    if (!text || text.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Message cannot be empty",
      });
    }

    const bot = new genai({ apiKey: process.env.GEMINI_API_KEY });

    const response = await bot.models.generateContent({
      model: "gemini-2.5-flash",
      contents: text,
    });

    const replyText = response.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't understand that.";

    let conversation = await Conversation.findOne({ userId });

    if (!conversation) {
      conversation = new Conversation({ userId, messages: [] });
    }

    conversation.messages.push({
      text,
      sender: "user",
      timestamp: new Date(),
    });

    conversation.messages.push({
      text: replyText,
      sender: "bot",
      timestamp: new Date(),
    });

    await conversation.save();

    return res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: conversation,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error sending message",
      error: err.message,
    });
  }
};


const deleteConversation = async (req, res) => {
  try {
    const { userId } = req.params;
    await Conversation.findOneAndDelete(userId);
    return res.status(200).json({
      success: true,
      message: "Conversation deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "error deleting messages",
      error: err.message,
    });
  }
};

module.exports = {
  getConversation,
  sendMessage,
  deleteConversation,
};
