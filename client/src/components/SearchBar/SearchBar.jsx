import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameDogs } from "../../redux/actions";
import styles from "./SearchBar.module.css";

const SearchBar = (props) => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getNameDogs(name));
    setName("");
  };

  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={handleSubmit}>
        Search
      </button>
      <input
        className={styles.input}
        type="text"
        value={name}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchBar;
