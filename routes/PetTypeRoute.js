const { Router } = require("express");
const { validarJWT } = require("../middlewares/validar-jwt");

const {
  getPetTypes,
  createPetType,
} = require("../controllers/PetTypeController");

const router = Router();

router.get("/", validarJWT, getPetTypes);
router.post("/create", validarJWT, createPetType);

module.exports = router;
