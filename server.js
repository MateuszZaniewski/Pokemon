const express = require("express");

const bodyParser = require("body-parser");

const cors = require("cors");

const app = express();

app.use(bodyParser.json());

app.use(cors());

const port = process.env.PORT || 3000;

// Import the users routes
const cardRoutes = require("./routes/cards");
const usersRoutes = require("./routes/users");

// Use the users routes

app.use("/api", cardRoutes);
app.use("/api", usersRoutes);

// Start the server

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
