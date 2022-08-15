import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Dogs from "../Dogs/Dogs";
import styles from "./Paginated.module.css";

const Paginate = () => {
  let dogs = useSelector((state) => state.dogs);

  const pagMax = Math.floor(
    Number.isInteger(dogs.length / 8) ? dogs.length / 8 - 1 : dogs.length / 8
  );
  const [pagActual, setPagActual] = useState(0);

  useEffect(() => {
    setPagActual(0);
  }, [dogs, pagMax]);

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

      <div className={styles.containerPaginated}>
        <Dogs pag={pagActual} />
      </div>
    </div>
  );
};

export default Paginate;
