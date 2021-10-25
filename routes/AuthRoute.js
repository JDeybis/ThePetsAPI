const { Router } = require("express");
const { validarJWT } = require("../middlewares/validar-jwt");
const { login, renovar_token } = require("../controllers/authController");

const router = Router();

router.post("/login", login);
router.get("/renovar_token", validarJWT, renovar_token);

module.exports = router;
