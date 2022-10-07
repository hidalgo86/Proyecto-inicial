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
    <Link to={`/home/${id}`}>
      <main
        className={
          component === "dogs" ? styles.containerDogs : styles.containerDetail
        }
      >
        <h3 className={styles.titulo}>{name}</h3>

        <figure className={styles.image}>
          <img src={image} alt={name} />
        </figure>

        <div className={styles.temperament}>
          <h3>Temperament:</h3>
          <p>{temperament}</p>
        </div>

        <div className={styles.containerInfo}>
          <div>
            <h4>Weight: </h4>
            {weight} kg
          </div>

          {height ? (
            <div className={styles.heightLifeSpan}>
              <h4>Height: </h4>
              {height} cm
            </div>
          ) : null}

          {lifeSpan ? (
            <div className={styles.heightLifeSpan}>
              <h4>Life Span: </h4>
              {lifeSpan}
            </div>
          ) : null}
        </div>
      </main>
    </Link>
  );
};

export default Dog;
