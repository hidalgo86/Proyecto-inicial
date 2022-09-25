import React, { useEffect, useState } from "react";
import logo from "../../img/dog.png";
import styles from "./Landing.module.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAllDogs } from "../../redux/actions";


export default function Landing() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllDogs());
  }, [dispatch]);

  const [size, setSize] = useState('large');

  return (
    <div className={styles.conteiner}>
      
      <b className={styles.titulo}>App Dogs</b>
     
      <div className={styles.img}>
        <img src={logo} alt="" />
      </div>
        
        <Link to="/home">
          <button className={styles.button}><b>START</b></button>
        </Link>

    </div>
  );
}
