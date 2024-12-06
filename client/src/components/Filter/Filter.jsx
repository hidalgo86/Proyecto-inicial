import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFilterDogs } from "../../redux/actions";
import styles from "./Filter.module.css";
import { BiSearchAlt } from "react-icons/bi";

const Filter = () => {
  const dispatch = useDispatch();

  const temperaments = useSelector((state) => state.temperaments);
  console.log(temperaments)
  const [form, setForm] = useState({
    temperament: "All",
    breed: "All",
    order: "asc",
  });

  const handleChange = (e) => {
    e.preventDefault();
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getFilterDogs(form));
    setForm({
      temperament: "All",
      breed: "All",
      order: "asc",
    });
  };

  return (
    <form type="submit" onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.temperament}>
        <label htmlFor="temperament">
          <b>Temperament: </b>
        </label>
        <select
          className={styles.input}
          id="temperament"
          name="temperament"
          value={form.temperament}
          onChange={handleChange}
        >
          <option value="All">All</option>
          {temperaments.map((temperament) => (
            <option key={temperament.id} value={temperament.name}>
              {temperament.name}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.breed}>
        <label htmlFor="breed">
          <b>Breed: </b>
        </label>
        <select
          className={styles.input}
          id="breed"
          name="breed"
          value={form.breed}
          onChange={handleChange}
        >
          <option value="All">All</option>
          <option value="Standard">Standard</option>
          <option value="Created">Created</option>
        </select>
      </div>

      <div className={styles.order}>
        <label htmlFor="order">
          <b>Order: </b>
        </label>
        <select
          className={styles.input}
          id="order"
          name="order"
          value={form.order}
          onChange={handleChange}
        >
          <option value="asc">Name (A - Z)</option>
          <option value="desc">Name (Z - A)</option>
          <option value="increment">Weight (Min - Max)</option>
          <option value="decrement">Weight (Max - Min)</option>
        </select>
      </div>

      <button className={styles.search} type="submit" onClick={handleSubmit}>
        <BiSearchAlt />
      </button>
    </form>
  );
};

export default Filter;
