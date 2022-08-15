import React, { useEffect } from "react";
import logo from "../../img/dog.png";
import styles from "./Start.module.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAllDogs } from "../../redux/actions";

export default function Start() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllDogs());
  }, [dispatch]);

  return (
    <div className={styles.conteiner}>
      <b className={styles.titulo}>App Dogs</b>
      <div className={styles.img}>
        <img src={logo} alt="" />
      </div>
      <div className={styles.conteiner_btn}>
        <Link to="/home">
          <button className={styles.button}>START</button>
        </Link>
      </div>
    </div>
  );
}
