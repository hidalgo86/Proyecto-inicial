import React from "react";
import { Router } from "react-router-dom";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { createMemoryHistory } from "history";
import Dog from "./components/Dog/Dog";

describe("componente Dog con argumento del component Dogs", () => {
  const history = createMemoryHistory();
  let component;

  beforeEach(() => {
    component = render(
      <Router history={history}>
        <Dog
          id={1}
          image="https://cdn2.thedogapi.com/images/BJa4kxc4X.jpg"
          name="Affenpinscher"
          temperament="Stubborn, Curious, Playful, Adventurous, Active, Fun-loving"
          weight="3 - 6"
          component="dogs"
        />
      </Router>
    );
  });

  test("debe mostrar el componente Dog", () => {
    expect(component.container).toBeInTheDocument();
  });

  test("debe mostrar la imagen de la raza", () => {
    expect(component.getByAltText("Affenpinscher")).toBeInTheDocument();
  });

  test("debe mostrar el nombre de la raza", () => {
    expect(component.getByText("Affenpinscher")).toBeInTheDocument();
  });

  test("debe mostrar el temperamento de la raza", () => {
    expect(
      component.getByText(
        "Stubborn, Curious, Playful, Adventurous, Active, Fun-loving"
      )
    ).toBeInTheDocument();
  });

  test("debe mostrar el peso de la raza", () => {
    expect(component.getByText("3 - 6 kg")).toBeInTheDocument();
  });
});

describe("componente Dog con argumento del component Detail", () => {
  let component;

  beforeEach(() => {
    component = render(
      <Dog
        id={1}
        image="https://cdn2.thedogapi.com/images/BJa4kxc4X.jpg"
        name="Affenpinscher"
        temperament="Stubborn, Curious, Playful, Adventurous, Active, Fun-loving"
        weight="3 - 6"
        height="23 - 29"
        lifeSpan="10 - 12 years"
        component="detail"
      />
    );
  });

  test("debe mostrar el componente Dog", () => {
    expect(component.container).toBeInTheDocument();
  });

  test("debe mostrar la imagen de la raza", () => {
    expect(component.getByAltText("Affenpinscher")).toBeInTheDocument();
  });

  test("debe mostrar el nombre de la raza", () => {
    expect(component.getByText("Affenpinscher")).toBeInTheDocument();
  });

  test("debe mostrar el temperamento de la raza", () => {
    expect(
      component.getByText(
        "Stubborn, Curious, Playful, Adventurous, Active, Fun-loving"
      )
    ).toBeInTheDocument();
  });

  test("debe mostrar el peso de la raza", () => {
    expect(component.getByText("3 - 6 kg")).toBeInTheDocument();
  });

  test("debe mostrar la altura de la raza", () => {
    expect(component.getByText("23 - 29 cm")).toBeInTheDocument();
  });

  test("debe mostrar la vida útil de la raza", () => {
    expect(component.getByText("10 - 12 years")).toBeInTheDocument();
  });
});
