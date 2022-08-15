import {
  GET_ALL_DOGS,
  GET_NAME_DOGS,
  GET_FILTER_DOGS,
  GET_DETAIL_DOG,
  POST_CREATE_DOGS,
  GET_TEMPERAMENTS,
} from "../types";
import axios from "axios";

export const getAllDogs = () => {
  return function (dispatch) {
    axios
      .get("http://localhost:3001/dogs")
      .then((response) =>
        dispatch({ type: GET_ALL_DOGS, payload: response.data })
      )
      .catch((error) => dispatch({ type: GET_ALL_DOGS, payload: [error] }));
  };
};

export const getNameDogs = (name) => {
  return function (dispatch) {
    axios
      .get(`http://localhost:3001/dogs?name=${name}`)
      .then((response) =>
        dispatch({ type: GET_NAME_DOGS, payload: response.data })
      )
      .catch((error) => dispatch({ type: GET_NAME_DOGS, payload: [] }));
  };
};

export const getFilterDogs = ({ temperament, breed, order }) => {
  return function (dispatch) {
    axios.get("http://localhost:3001/dogs").then((response) => {
      let dataFilter = [];

      temperament === "All"
        ? (dataFilter = response.data)
        : (dataFilter = response.data.filter((dog) =>
            dog.temperament ? dog.temperament.includes(temperament) : false
          ));

      breed === "Standard"
        ? (dataFilter = dataFilter.filter((dog) => typeof dog.id === "number"))
        : breed === "Created"
        ? (dataFilter = dataFilter.filter((dog) => typeof dog.id !== "number"))
        : (dataFilter = dataFilter);

      order === "asc"
        ? (dataFilter = dataFilter.sort((a, b) => {
            if (a.name.toLowerCase() > b.name.toLowerCase()) {
              return 1;
            }
            if (a.name.toLowerCase() < b.name.toLowerCase()) {
              return -1;
            }
          }))
        : order === "desc"
        ? (dataFilter = dataFilter.sort((b, a) => {
            if (a.name.toLowerCase() > b.name.toLowerCase()) {
              return 1;
            }
            if (a.name.toLowerCase() < b.name.toLowerCase()) {
              return -1;
            }
          }))
        : order === "increment"
        ? (dataFilter = dataFilter.sort((a, b) => {
            if (a.weightMin > b.weightMin) {
              return 1;
            }
            if (a.weightMin < b.weightMin) {
              return -1;
            }
          }))
        : order === "decrement"
        ? (dataFilter = dataFilter.sort((a, b) => {
            if (a.weightMax < b.weightMax) {
              return 1;
            }
            if (a.weightMax > b.weightMax) {
              return -1;
            }
          }))
        : (dataFilter = dataFilter);

      dispatch({ type: GET_FILTER_DOGS, payload: dataFilter });
    });
  };
};

export const getDetailDog = (idRaza) => {
  return idRaza
    ? function (dispatch) {
        axios
          .get(`http://localhost:3001/dogs/${idRaza}`)
          .then((response) =>
            dispatch({ type: GET_DETAIL_DOG, payload: response.data })
          )
          .catch((error) =>
            dispatch({ type: GET_DETAIL_DOG, payload: [error] })
          );
      }
    : function (dispatch) {
        dispatch({ type: GET_DETAIL_DOG, payload: [] });
      };
};

export const createDogs = ({
  name,
  heightMin,
  heightMax,
  weightMin,
  weightMax,
  lifeSpanMin,
  lifeSpanMax,
  temperaments,
}) => {
  temperaments = temperaments.map((temperament) => +temperament.split(":")[0]);
  let lifeSpan = lifeSpanMin + " - " + lifeSpanMax + " years";
  return function (dispatch) {
    axios
      .post("http://localhost:3001/dogs", {
        name,
        heightMin,
        heightMax,
        weightMin,
        weightMax,
        lifeSpan,
        temperaments,
      })
      .then((response) =>
        dispatch({ type: POST_CREATE_DOGS, payload: getAllDogs })
      )
      .catch((error) => dispatch({ type: POST_CREATE_DOGS, payload: [error] }));
  };
};

export const getTemperaments = () => {
  return function (dispatch) {
    axios
      .get("http://localhost:3001/temperaments")
      .then((response) =>
        dispatch({ type: GET_TEMPERAMENTS, payload: response.data })
      )
      .catch((error) => dispatch({ type: GET_TEMPERAMENTS, payload: [error] }));
  };
};
