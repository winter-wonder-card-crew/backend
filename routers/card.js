const express = require("express");
const router = express.Router();
const cardService = require("../services/cardServices");

// POST /api/v1/card - Create card
router.post("/", (req, res) => {
  const newCard = req.body;
  cardService
    .createCard(newCard)
    .then((createdCard) => {
      res
        .status(201)
        .json({ message: "카드가 생성되었습니다.", card: createdCard });
    })
    .catch((error) => {
      res.status(400).json({ error: error.message });
    });
});

// GET /api/v1/card/{cardId} - Get card
router.get("/:cardId", (req, res) => {
  const cardId = req.params.cardId;
  cardService
    .getCardById(cardId)
    .then((card) => {
      if (!card) {
        res.status(404).json({ message: "Card not found" });
      } else {
        res.status(200).json(card);
      }
    })
    .catch((error) => {
      res.status(400).json({ error: error.message });
    });
});

// GET /api/v1/card - Get all cards
router.get("/", (req, res) => {
  cardService
    .getAllCards()
    .then((cards) => {
      res.status(200).json(cards);
    })
    .catch((error) => {
      res.status(400).json({ error: error.message });
    });
});

// DELETE /api/v1/card/{cardId} - Delete card
router.delete("/:cardId", (req, res) => {
  const cardId = req.params.cardId;
  cardService
    .deleteCard(cardId)
    .then(() => {
      res.status(204).end();
    })
    .catch((error) => {
      res.status(400).json({ error: error.message });
    });
});

// POST /api/v1/card/{cardId}/share - card share
router.post("/:cardId/share", (req, res) => {
  const cardId = req.params.cardId;
  const recipient = req.body.recipient;
  cardService
    .shareCard(cardId, recipient)
    .then((sharedCard) => {
      res.status(200).json(sharedCard);
    })
    .catch((error) => {
      res.status(400).json({ error: error.message });
    });
});

module.exports = router;
