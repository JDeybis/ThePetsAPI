const { response } = require("express");
const Role = require("../models/UserRoleModel");

const createRole = async (req, res = response) => {
  try {
    const role = await Role.create(req.body);
    return res.json({
      ok: true,
      role,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: error.message,
    });
  }
};

const getRoles = async (req, res = response) => {
  try {
    const roles = await Role.find();
    return res.json({
      ok: true,
      roles,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: error.message,
    });
  }
};

module.exports = {
  createRole,
  getRoles,
};
