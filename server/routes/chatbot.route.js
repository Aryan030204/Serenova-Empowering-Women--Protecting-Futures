const express = require("express");
const getanswer = require("../controllers/chatbot.controller");
const chatRouter = express.Router();

chatRouter.post("/chat/", getanswer);

module.exports = chatRouter;