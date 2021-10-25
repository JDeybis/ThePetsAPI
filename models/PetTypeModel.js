var mongoose = require("mongoose");

var PetTypeSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("PetType", PetTypeSchema);
