const mongoose = require('mongoose');

const cheeseSchema = new mongoose.Schema({
  name: String
});

const Cheese = mongoose.model('Cheese', cheeseSchema);

module.exports = { Cheese };
