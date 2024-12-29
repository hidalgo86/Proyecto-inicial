const { default: axios } = require("axios");

const dogsAll = async (name) => {
  try {
    let api = await axios.get(`https://api.thedogapi.com/v1/breeds`);
    let dogs = api.data.map((dog) => {
      const weightArray =
        +dog.weight.metric > 0
          ? +dog.weight.metric
          : dog.weight.metric.split(" - ").length > 1
          ? dog.weight.metric.split(" - ")
          : 0;
      return {
        id: dog.id,
        name: dog.name,
        height: dog.height.metric,
        weight: dog.weight.metric,
        weightMin:
          typeof weightArray === "number"
            ? weightArray
            : weightArray === 0
            ? 0
            : +weightArray[0],
        weightMax:
          typeof weightArray === "number"
            ? weightArray
            : weightArray === 0
            ? 0
            : +weightArray[1],
        lifeSpan: dog.life_span,
        temperament: dog.temperament ? dog.temperament.split(", ") : [],
        image: `https://cdn2.thedogapi.com/images/${dog.reference_image_id}.jpg`,
      };
    });

    name
      ? (dogs = dogs.filter((dog) =>
          dog.name.toLowerCase().includes(name.toLowerCase())
        ))
      : null;

    return dogs;
  } catch (error) {
    return error.message;
  }
};

const dogsId = async (idRaza) => {
  try {
    let api = await axios.get(`https://api.thedogapi.com/v1/breeds/${idRaza}`);
    let data = api.data;

    return {
      weight: data.weight.metric,
      height: data.height.metric,
      lifeSpan: data.life_span,
    };
  } catch (error) {
    return error.message;
  }
};

const temperaments = async () => {
  try {
    let api = await axios.get(`https://api.thedogapi.com/v1/breeds`);
    let data = api.data.map((item) =>
      item.temperament ? item.temperament.split(", ") : []
    );

    let temperamentArray = [];

    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].length; j++) {
        if (temperamentArray.indexOf(data[i][j]) === -1) {
          temperamentArray.push(data[i][j]);
        }
      }
    }
    return temperamentArray.sort();
  } catch (error) {
    return error.message;
  }
};

module.exports = { dogsAll, dogsId, temperaments };
