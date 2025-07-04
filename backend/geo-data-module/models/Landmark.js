
const mongoose = require('mongoose');
const { Schema } = mongoose;

const landmarkSchema = new Schema({
  name: String,
  type: String,
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  properties: Object
});

// Создание геопространственного индекса
landmarkSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Landmark', landmarkSchema);