import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import Filter from "../Filter/Filter";
import Paginated from "../Paginated/Paginated";
import styles from "./Home.module.css";
import logo from "../../img/dog.png";
import { useDispatch } from "react-redux";
import { getAllDogs, getTemperaments } from "../../redux/actions";

const Home = () => {
  const dispatch = useDispatch();

  const [divice, setDivise] = useState("large");
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    dispatch(getAllDogs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  const x = () => {};

  useEffect(() => {
    if (window.screen.width >= 900) {
      setDivise("large");
    } else if (window.screen.width >= 600 && window.screen.width < 900) {
      setDivise("medium");
    } else {
      setDivise("smart");
    }
  }, []);

  const onChangeMenu = (e) => {
    e.preventDefault();
    if (menu) {
      setMenu(false);
    } else {
      setMenu(true);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.navBar}>
        <div className={styles.img}>
          <Link to="/">
            <img className={styles.image} src={logo} alt="" />
          </Link>
        </div>

        <div className={styles.searchBar}>
          <SearchBar />
        </div>

        {divice === "smart" ? (
          <button onClick={onChangeMenu} className={styles.buttonFilter}>
            Filter
          </button>
        ) : null}

        <div className={styles.buttonEdit}>
          <Link to="/createDogs">
            <button className={styles.buttonEdit}>Edit</button>
          </Link>
        </div>
      </div>

      {menu ? (
        <div className={styles.filter}>
          <Filter />
        </div>
      ) : null}

      <div className={styles.paginated}>
        <Paginated />
      </div>
    </div>
  );
};

export default Home;
