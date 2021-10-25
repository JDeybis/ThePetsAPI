const { response } = require("express");
const FavoriteUserPet = require("../models/FavoriteUserPetModel");

const getFavoritePets = async (req, res = response) => {
  try {
    const user = req.params.id;
    const favorites = await FavoriteUserPet.find({ user }).populate("pet");

    return res.json({
      ok: true,
      favorites,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: error.message,
    });
  }
};

const createFavoritePets = async (req, res = response) => {
  try {
    const favorite = await FavoriteUserPet.create(req.body);

    return res.json({
      ok: true,
      favorite,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: error.message,
    });
  }
};

const deleteFavoritePets = async (req, res = response) => {
  try {
    const id = req.params.id;
    const favorite = await FavoriteUserPet.findByIdAndRemove(id);

    return res.json({
      ok: true,
      msg: "Ya no es Favorito",
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: error.message,
    });
  }
};

module.exports = {
  getFavoritePets,
  createFavoritePets,
  deleteFavoritePets,
};
