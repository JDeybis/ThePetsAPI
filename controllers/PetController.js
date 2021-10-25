const { response } = require("express");
const Pet = require("../models/PetModel");
const FavoritePets = require("../models/FavoriteUserPetModel");

const getPets = async (req, res = response) => {
  try {
    const pets = await Pet.find({});
    return res.json({
      ok: true,
      pets,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: error.message,
    });
  }
};

const getFavoritePets = async (req, res = response) => {
  try {
    const id = req.params.id;

    const favoritePets = await FavoritePets.find({ user: id }).distinct("pet");

    const pets_liked = await Pet.find({ _id: { $in: favoritePets } }).populate(
      "pet_type"
    );
    const pets_not_liked = await Pet.find({
      _id: { $nin: favoritePets },
    }).populate("pet_type");

    let data = [];

    for (const pet of pets_liked) {
      data.push({
        pet,
        favorite: true,
      });
    }

    for (const pet of pets_not_liked) {
      data.push({
        pet,
        favorite: false,
      });
    }

    return res.json({
      ok: true,
      favorites: data,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: error.message,
    });
  }
};

const getPet = async (req, res = response) => {
  try {
    const id = req.params.id;
    const pet = await Pet.findById(id);
    const data = {
      name: pet.name,
      age: pet.age,
      description: pet.description,
      pet_type: pet.pet_type,
    };
    return res.json({
      ok: true,
      pet: data,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: error.message,
    });
  }
};

const createPet = async (req, res = response) => {
  try {
    req.body.image_url =
      "http://localhost:3000/images/" + req.files[0].filename;
    //console.log(req.body);
    const pet = await Pet.create(req.body);

    return res.json({
      ok: true,
      pet,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: error.message,
    });
  }
};

const updatePet = async (req, res = response) => {
  try {
    const id = req.params.id;
    let pet = await Pet.findById(id);
    pet.name = req.body.name;
    pet.age = req.body.age;
    pet.description = req.body.description;

    await pet.save();

    return res.json({
      ok: true,
      pet,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: error.message,
    });
  }
};

const deletePet = async (req, res = response) => {
  try {
    const id = req.params.id;
    const pet = await Pet.findByIdAndRemove(id);
    return res.json({
      ok: true,
      msg: "Mascota Eliminada",
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: error.message,
    });
  }
};

const deleteFavoritePet = async (req, res = response) => {
  try {
    const user = req.params.user;
    const pet = req.params.pet;
    const favorite = await FavoritePets.findOneAndRemove({ user, pet });
    return res.json({
      ok: true,
      msg: "Dejar de ser favorito",
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: error.message,
    });
  }
};

module.exports = {
  getPets,
  getPet,
  createPet,
  updatePet,
  deletePet,
  getFavoritePets,
  deleteFavoritePet,
};
