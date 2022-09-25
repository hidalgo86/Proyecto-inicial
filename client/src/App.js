import React from "react";
import { Route } from "react-router-dom";
import "./App.css";
import Landing from "./components/Landing/Landing";
import Home from "./components/Home/Home";
import Detail from "./components/Detail/Detail";
import CreateDog from "./components/CreateDog/CreateDog";

function App() {
  return (
    <React.Fragment>
      <Route exact path="/" component={Landing} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/home/:idRaza" component={Detail} />
      <Route exact path="/createDogs" component={CreateDog} />
    </React.Fragment>
  );
}

export default App;
