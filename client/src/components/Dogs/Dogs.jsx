import React from "react";
import { useSelector } from "react-redux";
import Dog from "../Dog/Dog";
import styles from "./Dogs.module.css";
import notFound from "../../img/notFound.jpg";

const Dogs = ({ pag, pagDogs }) => {
  
// almacenar en localStore la database de dogs  
  let dogs;
  if (localStorage.getItem("dogs")) {
    dogs = JSON.parse(localStorage.getItem("dogs"));
  }
  {
    dogs = useSelector((state) => state.dogs);
    localStorage.setItem("dogs", JSON.stringify(dogs));
  }

  return (
    <div className={styles.container}>
      {typeof dogs[0] === "object" ? (
        dogs
          .slice(pag * pagDogs, pag * pagDogs + pagDogs)
          .map((dog) => (
            <Dog
              component="dogs"
              key={dog.id || 1}
              image={dog.image}
              name={dog.name}
              id={dog.id}
              temperament={dog.temperament.join(", ")}
              weight={dog.weight}
            />
          ))
      ) : (
        <figure>
          <img src={notFound} alt="notFound" />
        </figure>
      )}
    </div>
  );
};

export default Dogs;
