const {GoogleGenAI} = require("@google/genai");
require("dotenv").config();
const getanswer = async (req, res) => {
  try {
    const { prompt } = req.body;
    if (prompt === "") {
      res.status(500).json({
        success: false,
        message: "prompt field is empty",
      });
    }
    const model = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const result = await model.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });
    res.status(200).json({
      success: true,
      message: "response generated successfully",
      data: result,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = getanswer;
