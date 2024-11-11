const express = require('express');

const router = express.Router();

const pokemons = [
  {
    id: 1,
    name: 'Bulbasaur',
    type: 'Grass',
    height: '7',
    weight: '69',
    description: 'Bulbasaur can be seen napping in bright sunlight. There is a seed on its back. By soaking up the sun’s rays, the seed grows progressively larger.',
  },
  {
    id: 2,
    name: 'Ivysaur',
    type: 'Grass',
    height: '10',
    weight: '132',
    description: 'There is a bud on Ivysaur’s back. To support its weight, Ivysaur’s legs and trunk grow thick and strong. If it starts spending more time lying in the sunlight, it’s a sign that the bud will bloom into a large flower soon.',
  },
  {
    id: 3,
    name: 'Venusaur',
    type: 'Grass',
    height: '20',
    weight: '1000',
    description: 'There is a large flower on Venusaur’s back. The flower is said to take on vivid colors if it gets plenty of nutrition and sunlight. The flower’s aroma soothes the emotions of people.',
  }
]


router.get('/pokemons', (req, res) => {
    console.log(res)
  res.json(pokemons);

});

router.get('/pokemons/:id', (req, res) => {
    console.log(res)
  const { id } = req.params;

  const pokemon = pokemons.find((pokemon) => pokemon.id === parseInt(id));

  if (!pokemon) {
    return res.status(404).json({ message: 'Pokemon not found' });
  }

  res.json(pokemon);
});



module.exports = router;