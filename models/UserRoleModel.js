var mongoose = require("mongoose");

var UserRoleSchema = new mongoose.Schema({
  role: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("UserRole", UserRoleSchema);
