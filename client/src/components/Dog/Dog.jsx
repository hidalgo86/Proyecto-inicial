import React from "react";
import { Link } from "react-router-dom";
import notImg from "../../img/Sin_imagen.jpg";
import styles from "./Dog.module.css";
import notFound from "../../img/notFound.jpg";

const Dog = ({
  id,
  image = notImg,
  name,
  temperament,
  weight,
  height,
  lifeSpan,
  component,
  dog,
}) => {
  return (
    <div className={styles.container}>
      {dog === "Not" ? (
        <div className={styles.notFound}>
          <img className={styles.img} src={notFound} alt="" />
        </div>
      ) : (
        <div
          className={
            component === "dogs"
              ? styles.containerDogs
              : component === "detail"
              ? styles.containerDetail
              : styles
          }
        >
          <div className={styles.containerImage}>
            <img className={styles.image} src={image} alt={name} />
          </div>

          {component === "dogs" ? (
            <div className={styles.breed}>
              <Link to={`/home/${id}`}>
                <b>{name}</b>
              </Link>
            </div>
          ) : null}
          {component === "detail" ? (
            <div className={styles.breed}>
              <b>{name}</b>
            </div>
          ) : null}

          <div className={styles.containerTemperament}>
            <b className={styles.temperamentTitulo}>Temperament:</b>
            <p className={styles.temperament}>{temperament}</p>
          </div>

          <div className={styles.containerInfo}>
            <p>
              <b>Weight: </b>
              {weight} kg
            </p>
            {height ? (
              <div>
                <b>Height: </b>
                {height} cm
              </div>
            ) : null}
            {lifeSpan ? (
              <div>
                <b>Life Span: </b>
                {lifeSpan}
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dog;
