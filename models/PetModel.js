var mongoose = require("mongoose");

var PetSchema = new mongoose.Schema({
  pet_type: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PetType",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  age: {
    type: String,
  },
  description: {
    type: String,
  },
  image_url: {
    type: String,
  },
});

module.exports = mongoose.model("Pet", PetSchema);
