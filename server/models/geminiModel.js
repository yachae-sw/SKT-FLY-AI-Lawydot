const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema({
  chatId: { type: String, required: true },
  buildingType: { type: String, required: true },
  rentalType: { type: String, required: true },
  perpetrator: { type: String, required: true },
  damageAmount: { type: String, required: true },
  briefSituation: { type: String, required: true },
  timestamp: Date,
});

module.exports = mongoose.model('responses', responseSchema);
