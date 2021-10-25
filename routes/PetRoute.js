const { Router } = require("express");
const { validarJWT } = require("../middlewares/validar-jwt");
var multer = require("multer");

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images");
  },
  filename: (req, file, cb) => {
    console.log(file);
    var filetype = "";
    if (file.mimetype === "image/gif") {
      filetype = "gif";
    }
    if (file.mimetype === "image/png") {
      filetype = "png";
    }
    if (file.mimetype === "image/jpeg") {
      filetype = "jpg";
    }
    cb(null, "image-" + Date.now() + "." + filetype);
  },
});

var upload = multer({ storage: storage });

const {
  getPets,
  getPet,
  getFavoritePets,
  createPet,
  updatePet,
  deletePet,
  deleteFavoritePet,
} = require("../controllers/PetController");

const router = Router();

router.get("/", validarJWT, getPets);
router.get("/:id", validarJWT, getPet);
router.get("/favorites/:id", validarJWT, getFavoritePets);
router.delete("/favorites/:user/:pet", validarJWT, deleteFavoritePet);
router.post("/create", [validarJWT, upload.array("file")], createPet);
router.put("/:id", validarJWT, updatePet);
router.delete("/:id", validarJWT, deletePet);

module.exports = router;
