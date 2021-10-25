const { Router } = require("express");
const { validarJWT } = require("../middlewares/validar-jwt");

const {
  getFavoritePets,
  createFavoritePets,
  deleteFavoritePets,
} = require("../controllers/FavoriteUserPetController");

const route = Router();

route.get("/pets/:id", validarJWT, getFavoritePets);
route.post("/pets", validarJWT, createFavoritePets);
route.delete("/:id", validarJWT, deleteFavoritePets);

module.exports = route;
