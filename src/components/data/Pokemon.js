const pokemonDataFile = [
  {
    name: "Dialga",
    description:
      "Dialga is known as the Temporal Pokémon. It has the ability to manipulate time.",
    type: ["Steel", "Dragon"],
    height: 5.4,
    weight: 683.0,
    abilities: [
      {
        name: "Pressure",
        effect:
          "The opponent's PP decreases by 2 instead of 1 when using a move.",
      },
    ],
    base_stats: {
      hp: 100,
      attack: 120,
      defense: 120,
      special_attack: 150,
      special_defense: 100,
      speed: 90,
    },
    moves: [
      {
        name: "Roar of Time",
        type: "Dragon",
        power: 150,
        accuracy: 90,
        pp: 5,
        description: "A powerful move that distorts time itself.",
      },
    ],
    generation: 4,
    evolutions: [],
  },
  {
    name: "Giratina",
    description:
      "Giratina is the Renegade Pokémon. It lives in a reverse dimension.",
    type: ["Ghost", "Dragon"],
    height: 4.5,
    weight: 750.0,
    abilities: [
      {
        name: "Pressure",
        effect:
          "The opponent's PP decreases by 2 instead of 1 when using a move.",
      },
    ],
    base_stats: {
      hp: 150,
      attack: 100,
      defense: 120,
      special_attack: 100,
      special_defense: 120,
      speed: 90,
    },
    moves: [
      {
        name: "Shadow Force",
        type: "Ghost",
        power: 120,
        accuracy: 100,
        pp: 5,
        description: "Giratina vanishes and strikes on the next turn.",
      },
    ],
    generation: 4,
    evolutions: [],
  },
  {
    name: "Kyogre",
    description:
      "Kyogre is the Sea Basin Pokémon. It can expand the oceans and cause heavy rainfall.",
    type: ["Water"],
    height: 4.5,
    weight: 352.0,
    abilities: [
      {
        name: "Drizzle",
        effect: "Summons rain when Kyogre enters the battle.",
      },
    ],
    base_stats: {
      hp: 100,
      attack: 100,
      defense: 90,
      special_attack: 150,
      special_defense: 140,
      speed: 90,
    },
    moves: [
      {
        name: "Water Spout",
        type: "Water",
        power: 150,
        accuracy: 100,
        pp: 5,
        description: "The user unleashes its HP in a powerful water attack.",
      },
    ],
    generation: 3,
    evolutions: [],
  },
  // Thêm các Pokémon khác tương tự vào đây...
];

module.exports = pokemonDataFile;
