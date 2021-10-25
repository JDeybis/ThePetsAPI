const { Router } = require("express");
const { createUser } = require("../controllers/UserController");

const router = Router();

router.post("/", createUser);

module.exports = router;
