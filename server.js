const express = require('express');

const bodyParser = require('body-parser');

const cors = require('cors');



const app = express();



app.use(bodyParser.json());

app.use(cors());



const port = process.env.PORT || 3000;



// Import the users routes
const pokemonRoutes = require('./routes/pokemons');



// Use the users routes

app.use('/api', pokemonRoutes);

// Start the server

app.listen(port, () => {

  console.log("Server is running on port 3000");

});