const mongoose = require('mongoose');

const cosinSchema = new mongoose.Schema({
  chatId: {
    type: String,
    required: true,
  },
  messages: [
    {
      situationSummary_reuslt: string,
      timestamp: Date,
    },
  ],
  completedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Cosin_', cosinSchema);
