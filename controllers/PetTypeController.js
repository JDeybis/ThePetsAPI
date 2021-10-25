const { response } = require("express");
const PetType = require("../models/PetTypeModel");

const getPetTypes = async (req, res = response) => {
  try {
    const petTypes = await PetType.find({});

    return res.json({
      ok: true,
      petTypes,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: error.message,
    });
  }
};

const getPetType = async (req, res) => {};

const createPetType = async (req, res) => {
  try {
    const petType = await PetType.create(req.body);

    return res.json({
      ok: true,
      petType,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: error.message,
    });
  }
};

const updatePetType = async (req, res) => {};

const deletePetType = async (req, res) => {};

module.exports = {
  getPetTypes,
  getPetType,
  createPetType,
  updatePetType,
  deletePetType,
};
