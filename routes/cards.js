const express = require("express");
const cards = require("../cards.json");
const router = express.Router();

// zwraca wszystkie karty
router.get("/cards", (req, res) => {
  res.json(cards);
});

// wyszukiwanie kart po wielu parametrach jednocześnie
router.get("/cards/search", (req, res) => {
  let { sort, order = "asc", limit, offset, ...filters } = req.query;

  limit = limit ? parseInt(limit, 10) : null;
  offset = offset ? parseInt(offset, 10) : 0;

  const operators = {
    ">=": (a, b) => a >= b,
    "<=": (a, b) => a <= b,
    ">": (a, b) => a > b,
    "<": (a, b) => a < b,
    "=": (a, b) => a == b,
  };

  const parseFilter = (key, value, cardValue) => {
    const match = value.match(/(>=|<=|>|<|=)?(.+)/);
    if (!match) return false;

    const [, op = "=", rawVal] = match;
    const parsedFilterVal = isNaN(rawVal)
      ? rawVal.toLowerCase()
      : Number(rawVal);
    const parsedCardVal = isNaN(cardValue)
      ? cardValue.toString().toLowerCase()
      : Number(cardValue);

    if (
      typeof parsedCardVal === "number" &&
      typeof parsedFilterVal === "number"
    ) {
      return operators[op](parsedCardVal, parsedFilterVal);
    }

    // Tekstowe porównanie (fragment + nieczułe na wielkość liter)
    return parsedCardVal.includes(parsedFilterVal);
  };

  let filteredCards = cards.data.filter((card) => {
    return Object.entries(filters).every(([key, value]) => {
      const cardValue = card[key];
      if (cardValue === undefined || cardValue === null) return false;

      const valuesArray = value.split(",").map((v) => v.trim());
      return valuesArray.some((v) => parseFilter(key, v, cardValue));
    });
  });

  if (filteredCards.length === 0) {
    return res
      .status(404)
      .json({ message: "No cards match the search criteria." });
  }

  // Sortowanie
  if (sort) {
    filteredCards.sort((a, b) => {
      const aVal = a[sort];
      const bVal = b[sort];

      if (aVal === undefined || bVal === undefined) return 0;

      if (typeof aVal === "string" && typeof bVal === "string") {
        return order === "desc"
          ? bVal.localeCompare(aVal)
          : aVal.localeCompare(bVal);
      } else {
        return order === "desc" ? bVal - aVal : aVal - bVal;
      }
    });
  }

  // Paginacja
  const paginatedCards = limit
    ? filteredCards.slice(offset, offset + limit)
    : filteredCards;

  res.json({
    total: filteredCards.length,
    results: paginatedCards,
  });
});

// wyszukiwanie po nazwie
router.get("/cards/name/:name", (req, res) => {
  const { name } = req.params;
  const card = cards.data.find((card) => card.name === name);

  if (!card) {
    return res
      .status(404)
      .json({ message: "Card with that name is not found" });
  }

  res.json(card);
});

// wyszukiwanie po ID
router.get("/cards/id/:id", (req, res) => {
  const { id } = req.params;
  const card = cards.data.find((card) => card.id === +id);

  if (!card) {
    return res.status(404).json({ message: "Card with this ID is not found" });
  }

  res.json(card);
});

module.exports = router;
