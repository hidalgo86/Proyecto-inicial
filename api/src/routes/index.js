const { Router } = require("express");
const { dogsAll, dogsId, temperaments } = require("../controllers");
const { Dog, Temperament } = require("../db.js");
const  { validate } = require("./validate");

const router = Router();

router.get("/dogs", async (req, res) => {
  try {
    const { name } = req.query;
    let dataApi = await dogsAll(name);
    let dataDb = [];

    !name
      ? (dataDb = await Dog.findAll({
          include: [
            {
              model: Temperament,
              through: {
                attributes: [],
              },
              attributes: ["name"],
            },
          ],
        }))
      : (dataDb = await Dog.findAll({
          where: {
            name: name.toLowerCase(),
          },

          include: [
            {
              model: Temperament,
              through: {
                attributes: [],
              },
              attributes: ["name"],
            },
          ],
        }));

    dataDb = dataDb.map((dog) => {
      const weightArray = dog.weight.split(" - ");

      return {
        id: dog.id,
        name: dog.name,
        height: dog.height,
        weight: dog.weight,
        weightMin: +weightArray[0],
        weightMax: +weightArray[1],
        lifeSpan: dog.lifeSpan,
        temperament: dog.Temperaments.map((temperament) => temperament.name),
        image: dog.image,
      };
    });

    let data = dataApi.concat(dataDb);

    data.length === 0
      ? res.status(400).json({ message: "Raza no contrada" })
      : res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.get("/dogs/:idRaza", async (req, res) => {
  try {
    let id = req.params.idRaza;
    let num = +id;
    let data = [];

    num > 0
      ? (data = await dogsId(id))
      : (data = await Dog.findByPk(id, {
          attributes: ["height", "weight", "lifeSpan"],
        }));

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.post("/dogs", async (req, res) => {
  try {
    const {
      name,
      heightMin,
      heightMax,
      weightMin,
      weightMax,
      lifeSpanMin,
      lifeSpanMax,
      temperaments,
    } = req.body;

    let temperament = temperaments.map((temperament) => +temperament.split(":")[0]);
    let lifeSpan = lifeSpanMin + " - " + lifeSpanMax + " years";

    let validator = validate(req.body);

    if (Object.keys(validator).length > 0) {
      res.status(400).json(validator);
    } else {
      const data = await Dog.create({
      name: name,
      height: `${heightMin} - ${heightMax}`,
      weight: `${weightMin} - ${weightMax}`,
      lifeSpan: lifeSpan,
    });
    await data.addTemperaments(temperament);

    res.status(200).json(data);}
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.get("/temperaments", async (req, res) => {
  try {
    const data = await temperaments();
    data.forEach((el) => {
      Temperament.findOrCreate({
        where: { name: el },
      });
    });
    const allTemperaments = await Temperament.findAll();
    res.status(200).json(allTemperaments);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = router;
