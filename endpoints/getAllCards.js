const express = require("express");
const cards = require("../cards.json");
const router = express.Router();

export const getAllCards = router.get("/cards", (req, res) => {
  res.json(cards);
});
