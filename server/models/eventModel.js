const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: Date,
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { collection: 'events' }); // Koleksiyon adı 'events' olarak belirlendi

module.exports = mongoose.model('Event', eventSchema); // Model adı 'Event' olarak kalır