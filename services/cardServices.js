const Card = require("../db/schemas/cardSchema");
const mongoose = require("mongoose");

// Create card
function createCard(cardData) {
  return Card.create(cardData);
}

// Get card
function getCardById(cardId) {
  return Card.findById(cardId)
    .then((card) => {
      if (!card) {
        throw new Error("Card not found");
      }
      return card;
    })
    .catch((error) => {
      throw error; // 에러를 다시 던지는 것은 여기서 필요하지 않을 수 있습니다.
    });
}

const deleteCard = async (cardId) => {
  try {
    // findByIdAndDelete로 변경
    const result = await Card.findByIdAndDelete(cardId);

    if (!result) {
      throw new Error("Card not found");
    }
  } catch (error) {
    throw error;
  }
};

// Share card
function shareCard(cardId, recipient) {
  return Card.findByIdAndUpdate(
    cardId,
    { $set: { receiver: recipient } },
    { new: true }
  ).then((updatedCard) => {
    if (!updatedCard) {
      throw new Error("Card not found");
    }
    return updatedCard;
  });
}

// Get all cards
function getAllCards() {
  return Card.find();
}

module.exports = {
  createCard,
  getCardById,
  deleteCard,
  shareCard,
  getAllCards,
};
