require("dotenv").config();

const express = require("express");
const cors = require("cors");

const { dbConnection } = require("./database/config");

const app = express();

app.use(cors());

app.use(express.static("public"));
app.use(express.json());

dbConnection();

app.use("/api/v1/auth", require("./routes/AuthRoute"));
app.use("/api/v1/role", require("./routes/RoleRoute"));
app.use("/api/v1/user", require("./routes/UserRoute"));
app.use("/api/v1/types", require("./routes/PetTypeRoute"));
app.use("/api/v1/pets", require("./routes/PetRoute"));
app.use("/api/v1/favorite", require("./routes/FavoriteUserPetRoute"));

app.listen(process.env.PORT, () => {
  console.log("servidor corriendo en puerto " + process.env.PORT);
});
