import React from "react";
import { useSelector } from "react-redux";
import Dog from "../Dog/Dog";
import styles from "./Dogs.module.css";

const Dogs = ({ pag, pagDogs }) => {
  let dogs = useSelector((state) => state.dogs);

  localStorage.setItem("dogs", JSON.stringify(dogs));
  dogs = JSON.parse(localStorage.getItem("dogs"));

  return (
    <div className={styles.container}>
      {dogs.length ? (
        dogs
          .slice(pag * pagDogs, pag * pagDogs + pagDogs)
          .map((dog) => (
            <Dog
              component="dogs"
              key={dog.id}
              image={dog.image}
              name={dog.name}
              id={dog.id}
              temperament={dog.temperament.join(", ")}
              weight={dog.weight}
            />
          ))
      ) : (
        <Dog component="dogs" dog="Not" />
      )}
    </div>
  );
};

export default Dogs;
