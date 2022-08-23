import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Dogs from "../Dogs/Dogs";
import styles from "./Paginated.module.css";

const Paginate = () => {
  let dogs = useSelector((state) => state.dogs);
 
  const [pagDogs, setPagDogs] = useState(8);
  const [pagActual, setPagActual] = useState(0);
 
  const pagMax = Math.floor(
    Number.isInteger(dogs.length / pagDogs) ? dogs.length / pagDogs - 1 : dogs.length / pagDogs
  );

  useEffect(() => {
    setPagActual(0);
  }, [pagMax]);

  useEffect(() => {
    window.screen.width >= 750 ? setPagDogs(8) : setPagDogs(4)
  }, [pagDogs]);

  const previous = () => {
    pagActual === 0 ? setPagActual(pagActual) : setPagActual(pagActual - 1);
  };

  const next = () => {
    pagActual === pagMax
      ? setPagActual(pagActual)
      : setPagActual(pagActual + 1);
  };

  return (
    <div className={styles.container}>

      <div className={styles.containerButton}>

        <button className={styles.button} type="submit" onClick={previous}>
          PREVIOUS
        </button>

        <b className={styles.pag}>
          {pagActual + 1} / {isNaN(pagMax) ? 1 : pagMax + 1}
        </b>

        <button className={styles.button} type="submit" onClick={next}>
          NEXT
        </button>

      </div>

      <div>
        <Dogs 
        pag={pagActual}
        pagDogs={pagDogs}
        />
      </div>

    </div>
  );
};

export default Paginate;
