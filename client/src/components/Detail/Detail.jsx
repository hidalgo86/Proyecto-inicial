import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Dog from "../Dog/Dog";
import { getDetailDog } from "../../redux/actions";
import styles from "./Detail.module.css";

export class Detail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dog: {},
      detail: {},
      loading: true,
    };
  }

  componentDidMount() {
    let id = this.props.match.params.idRaza;
    this.props.getDetailDog(id);

    let detail = this.props.detail;

    let dog = [];
    dog = JSON.parse(localStorage.getItem("dogs")).find(
      (dog) => dog.id === +id
    );

    this.setState({ ...this.state, dog: dog, detail: detail });

    localStorage.setItem("id", id);
    id = localStorage.getItem("id");
  }

  componentDidUpdate(prevProps) {
    if (prevProps.detail !== this.props.detail) {
      this.setState({
        detail: this.props.detail,
        loading: false,
      });
    }
  }

  componentWillUnmount() {
    this.props.getDetailDog();
  }

  render() {
    const { dog, detail, loading } = this.state;
    return (
      <div>
        <div className={styles.container}>
          <div className={styles.navBar}>
            <Link to="/home">
              <button className={styles.button}>Return</button>
            </Link>
          </div>

          {loading ? (
            <div className={styles.loading}>
              <h1>Loading...</h1>
            </div>
          ) : (
            <div className={styles.detail}>
              <Dog
                component="detail"
                id={+dog.id}
                image={dog.image}
                name={dog.name}
                temperament={dog.temperament.join(", ")}
                weight={detail.weight}
                height={detail.height}
                lifeSpan={detail.lifeSpan}
              />
            </div>
          )}
        </div>
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
