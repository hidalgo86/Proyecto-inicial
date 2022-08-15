import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import Filter from "../Filter/Filter";
import Paginated from "../Paginated/Paginated";
import styles from "./Home.module.css";
import logo from "../../img/dog.png";
import { useDispatch } from "react-redux";
import { getTemperaments } from "../../redux/actions";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <div className={styles.navBar}>
        <div>
          <Link to="/">
            <img className={styles.img} src={logo} alt="" />
          </Link>
        </div>
        <div className={styles.searchBar}>
          <SearchBar />
        </div>
        <div>
          <Link to="/createDogs">
            <button className={styles.button}>Create</button>
          </Link>
        </div>
      </div>
      <div className={styles.filter}>
        <Filter />
      </div>
      <div className={styles.paginated}>
        <Paginated />
      </div>
    </div>
  );
};

export default Home;
