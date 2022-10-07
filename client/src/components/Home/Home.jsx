import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import Filter from "../Filter/Filter";
import Paginated from "../Paginated/Paginated";
import styles from "./Home.module.css";
import logo from "../../img/dog.png";
import { useDispatch } from "react-redux";
import { getAllDogs, getTemperaments } from "../../redux/actions";
import { GrFilter } from "react-icons/gr";
import { FaDog } from "react-icons/fa";


const Home = () => {
  const dispatch = useDispatch();

  const [divice, setDivise] = useState("large");
  const [menu, setMenu] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.screen.width);

  useEffect(() => {
    dispatch(getAllDogs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  useEffect(() => {
    if (window.screen.width >= 900) {
      setDivise("large");
    } else if (window.screen.width >= 600 && window.screen.width < 900) {
      setDivise("medium");
    } else {
      setDivise("smart");
    }
  }, [windowWidth]);

  const onChangeMenu = (e) => {
    e.preventDefault();
    if (menu) {
      setMenu(false);
    } else {
      setMenu(true);
    }
  };

  const onChangeWindow = () => {
    localStorage.setItem("with", window.screen.width);
    return setWindowWidth(window.screen.width);
  };

  window.addEventListener("resize", onChangeWindow);

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
            <GrFilter /> Filter 
          </button>
        ) : null}

        <div className={styles.buttonEdit}>
          <Link to="/createDogs">
            <button className={styles.Edit}>
              <FaDog /> add 
              {/* / Ancho:{windowWidth}px  */}
            </button>
          </Link>
        </div>
      </div>

      {menu ? (
        <div className={styles.filter}>
          <Filter />
        </div>
      ) : null}

      {divice === "large" || divice === "medium" ? (
        <div className={styles.filter}>
          <Filter />
        </div>
      ) : null}

      <div className={styles.paginated}>
        <Paginated windowWidth={windowWidth} />
      </div>
    </div>
  );
};

export default Home;
