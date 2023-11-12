const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const cardService = require("../services/cardServices");

// POST /card - Create card
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

// GET /card/{cardId} - Get card
router.get("/:cardId", (req, res) => {
  const { cardId } = req.params;

  try {
    const cardObjectId = new mongoose.Types.ObjectId(cardId);

    cardService
      .getCardById(cardObjectId)
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
  } catch (error) {
    res.status(400).json({ error: "Invalid cardId format" });
  }
});

// GET /card - Get all cards
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

// DELETE /card/{cardId} - Delete card
router.delete("/:cardId", async (req, res) => {
  const cardId = req.params.cardId;

  try {
    if (!mongoose.Types.ObjectId.isValid(cardId)) {
      throw new Error("Invalid cardId format");
    }

    const cardObjectId = new mongoose.Types.ObjectId(cardId); // 'new' 키워드 추가

    console.log(cardId);

    await cardService.deleteCard(cardObjectId);

    res.status(200).json({ message: "카드가 삭제되었습니다." });
  } catch (error) {
    console.error(error); // 에러 로그 출력
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST /card/{cardId}/share - card share
router.post("/:cardId/share", (req, res) => {
  const cardId = req.params.cardId;
  const recipient = req.body.recipient;

  try {
    if (!mongoose.Types.ObjectId.isValid(cardId)) {
      throw new Error("Invalid cardId format");
    }

    const cardObjectId = new mongoose.Types.ObjectId(cardId);

    cardService
      .shareCard(cardObjectId, recipient)
      .then((sharedCard) => {
        res.status(200).json(sharedCard);
      })
      .catch((error) => {
        res.status(400).json({ error: error.message });
      });
  } catch (error) {
    res.status(400).json({ error: "Invalid cardId format" });
  }
});

module.exports = router;
