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
          <b className={styles.Titulo}>Temperament:</b>
          <p className={styles.detalle}>{temperament}</p>
        </div>

        <div className={styles.containerInfo}>
          <div>
            <b>Weight: </b>
            {weight} kg
          </div>

          {height && lifeSpan ? (
            <div className={styles.heightLifeSpan}>
              <div>
                <b>Height: </b>
                {height} cm
              </div>

              <div>
                <b>Life Span: </b>
                {lifeSpan}
              </div>
            </div>
          ) : null}
        </div>
      </main>
    </Link>
  );
};

export default Dog;
