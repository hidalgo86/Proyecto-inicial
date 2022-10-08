import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Dog from "../Dog/Dog";
import { getDetailDog } from "../../redux/actions";
import styles from "./Detail.module.css";
import {FcNext} from "react-icons/fc"
import {FcPrevious} from "react-icons/fc"


export class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dogAll: null,
      idAll: null,
      dog: {},
      detail: {},
      loading: true,
      id: Number(this.props.match.params.idRaza),
    };
  }

  componentDidMount() {
    let id = this.state.id;
    this.props.getDetailDog(id);

    let dogsAll = JSON.parse(localStorage.getItem("dogs"));

    let detail = this.props.detail;

    let dog = dogsAll.find((dog) => dog.id === +id);

    let idAll = dogsAll.map((dog) => {
      return dog.id;
    });

    this.setState({
      ...this.state,
      dog: dog,
      detail: detail,
      dogsAll: dogsAll,
      idAll: idAll,
    });

    localStorage.setItem("id", id);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.detail !== this.props.detail) {
      this.setState({
        ...this.state,
        detail: this.props.detail,
        loading: false,
      });
    }

    if (prevState.id !== this.state.id) {
      let id = this.state.id;
      this.props.getDetailDog(id);

      let detail = this.props.detail;

      let dog = JSON.parse(localStorage.getItem("dogs")).find(
        (dog) => dog.id === +id
      );

      this.setState({ ...this.state, dog: dog, detail: detail });
    }
  }

  componentWillUnmount() {
    this.props.getDetailDog();
  }

  previous = () => {
    if (this.state.idAll.includes(this.state.id - 1)) {
      this.setState({ ...this.state, id: this.state.id - 1 });
      localStorage.setItem("id", this.state.id - 1);
    } else  {
      let index = this.state.idAll.indexOf(this.state.id);
      if(this.state.idAll[index - 1]){
        this.setState({ ...this.state, id: this.state.idAll[index - 1]});
        localStorage.setItem("id", this.state.idAll[index - 1]);
      };
    }
  };

  next = () => {
    if (this.state.idAll.includes(this.state.id + 1)) {
      this.setState({ ...this.state, id: this.state.id + 1 });
      localStorage.setItem("id", this.state.id + 1);
    } else {
      let index = this.state.idAll.indexOf(this.state.id);
      if(this.state.idAll[index + 1]){
        this.setState({ ...this.state, id: this.state.idAll[index + 1]});
        localStorage.setItem("id", this.state.idAll[index + 1]);
      };
    }
  };

  render() {
    const { dog, detail, loading } = this.state;
    return (
      <div>
        <nav>
          <Link to="/home">
            <button className={styles.return}>Return</button>
          </Link>
        </nav>

        {loading ? (
          <main className={styles.loading}>
            <div className={styles.spinner}></div>
            <h1> Loading...</h1>
          </main>
        ) : (
          <main>
            <button className={styles.button} onClick={this.previous}><FcPrevious/></button>
            <Dog
              component="detail"
              id={localStorage.getItem("id")}
              image={dog.image}
              name={dog.name}
              temperament={dog.temperament.join(", ")}
              weight={detail.weight}
              height={detail.height}
              lifeSpan={detail.lifeSpan}
            />
            <button className={styles.button} onClick={this.next}><FcNext/></button>
          </main>
        )}
      </div>
    );
  }
}

export const mapStateToProps = (state) => {
  return {
    dogs: state.dogs,
    detail: state.detail,
  };
};

export const mapDispatchToProps = (dispatch) => {
  return {
    getDetailDog: (id) => dispatch(getDetailDog(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
