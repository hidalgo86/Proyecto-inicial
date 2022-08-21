import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createDogs, getAllDogs, getTemperaments } from "../../redux/actions";
import styles from "./CreateDog.module.css";
import { validate } from "./validate";

const CreateDog = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  const temperaments = useSelector((state) => state.temperaments);

  const [dog, setDog] = useState({
    name: "",
    heightMin: "",
    heightMax: "",
    weightMin: "",
    weightMax: "",
    lifeSpanMin: "",
    lifeSpanMax: "",
    temperament: "",
    temperaments: [],
  });

  const [error, setError] = useState({});

  const handleChange = (e) => {
    e.preventDefault();
    setDog({
      ...dog,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const error = validate(dog);
    setError(error);
    if (Object.keys(error).length === 0) {
      dispatch(createDogs(dog));
      setDog({
        name: "",
        heightMin: "",
        heightMax: "",
        weightMin: "",
        weightMax: "",
        lifeSpanMin: "",
        lifeSpanMax: "",
        temperament: "",
        temperaments: [],
        error: {},
      });
      dispatch(getAllDogs());
      alert("Dog created successfully");
    } else {
      return;
    }
  };

  const handleTemperaments = (e) => {
    e.preventDefault();
    let newTemperament = e.target.value;
    if (dog.temperaments.includes(newTemperament)) {
    } else {
      let newTemperaments = [...dog.temperaments, newTemperament];
      setDog({ ...dog, temperaments: newTemperaments });
    }
  };

  const setTemperaments = (e) => {
    e.preventDefault();
    let setTemperament = dog.temperaments.filter(
      (temperament) => temperament !== e.target.value
    );
    setDog({ ...dog, temperaments: setTemperament });
  };

  return (
    <div className={styles.container}>
      <div className={styles.containerButton}>
        <Link to="/home">
          <button className={styles.button}>Return</button>
        </Link>
      </div>

      <div className={styles.containerForm}>
        <form className={styles.form}>
          <div>
            <label htmlFor="name">
              <b>Name: </b>
            </label>
            <input
              type="text"
              name="name"
              placeholder="name"
              value={dog.name}
              onChange={handleChange}
              className={styles.inputText}
            />
            {error.name && <p className={styles.error}>{error.name}</p>}
          </div>

          <div>
            <b>Height: </b>
            <input
              type="number"
              name="heightMin"
              placeholder="Min"
              value={dog.heightMin}
              onChange={handleChange}
              className={styles.inputNumber}
              min={0}
            />
            <input
              type="number"
              name="heightMax"
              placeholder="Max"
              value={dog.heightMax}
              onChange={handleChange}
              className={styles.inputNumber}
              min={0}
            />

            {error.heightMin || error.heightMax ? (
              <p className={styles.error}>
                {error.heightMin} <br /> {error.heightMax}
              </p>
            ) : null}
          </div>

          <div>
            <b>Weight: </b>
            <input
              type="number"
              name="weightMin"
              placeholder="Min"
              value={dog.weightMin}
              onChange={handleChange}
              className={styles.inputNumber}
              min={0}
            />
            <input
              type="number"
              name="weightMax"
              placeholder="Max"
              value={dog.weightMax}
              onChange={handleChange}
              className={styles.inputNumber}
              min={0}
            />
            {error.weightMin || error.weightMax ? (
              <p className={styles.error}>
                {error.weightMin} <br /> {error.weightMax}
              </p>
            ) : null}
          </div>

          <div>
            <b>Life Span: </b>
            <input
              type="number"
              name="lifeSpanMin"
              placeholder="Min"
              value={dog.lifeSpanMin}
              onChange={handleChange}
              className={styles.inputNumber}
              min={0}
            />
            <input
              type="number"
              name="lifeSpanMax"
              placeholder="Max"
              value={dog.lifeSpanMax}
              onChange={handleChange}
              className={styles.inputNumber}
              min={0}
            />
            {error.lifeSpanMin || error.lifeSpanMax ? (
              <p className={styles.error}>
                {error.lifeSpanMin} <br /> {error.lifeSpanMax}
              </p>
            ) : null}
          </div>

          <div>
            <label htmlFor="temperament">
              <b>Temperaments: </b>
            </label>
            <select
              id="temperament"
              name="temperament"
              value={dog.temperament}
              onChange={handleTemperaments}
              className={styles.inputTemperament}
            >
              <option value="">Seleccione</option>
              {temperaments.map((temperament) => (
                <option
                  key={temperament.id}
                  value={`${temperament.id}:${temperament.name}`}
                >
                  {temperament.name}
                </option>
              ))}
            </select>
            {error.temperaments && (
              <p className={styles.error}>{error.temperaments}</p>
            )}
          </div>

          <div>
            {dog.temperaments.map((temperament) => (
              <button
                key={temperament}
                value={temperament}
                onClick={setTemperaments}
                className={styles.buttonTemperament}
              >
                {temperament.split(":")[1]}
              </button>
            ))}
          </div>

          <div className={styles.create}>
            <button
              className={styles.button}
              type="submit"
              onClick={handleSubmit}
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateDog;
