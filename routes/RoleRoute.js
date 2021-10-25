const { Router } = require("express");
const { validarJWT } = require("../middlewares/validar-jwt");

const { createRole, getRoles } = require("../controllers/RoleController");

const router = Router();

router.get("/", validarJWT, getRoles);
router.post("/", validarJWT, createRole);

module.exports = router;
