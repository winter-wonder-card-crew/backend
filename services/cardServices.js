const Card = require("../db/schemas/cardSchema");

// Create card
function createCard(cardData) {
  return Card.create(cardData);
}

// Get card
function getCardById(cardId) {
  return Card.findById(cardId);
}

// Delete card
function deleteCard(cardId) {
  return Card.findByIdAndRemove(cardId);
}

// Share card
function shareCard(cardId, recipient) {
  return Card.findByIdAndUpdate(
    cardId,
    { $set: { receiver: recipient } },
    { new: true }
  );
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
