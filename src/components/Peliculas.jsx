import React, { Component } from "react";
import Pelicula from "./Pelicula";
import SideBar from "./SideBar";
import Slider from "./Slider";

class Peliculas extends Component {
  state = {
    peliculas: [
      {
        title: "Batman vs superman",
        year: 2017,
        image:
          "https://m.media-amazon.com/images/M/MV5BYThjYzcyYzItNTVjNy00NDk0LTgwMWQtYjMwNmNlNWJhMzMyXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg",
      },
      {
        title: "El señor de los anillos",
        year: 2002,
        image:
          "https://hips.hearstapps.com/hmg-prod/images/el-senor-de-los-anillos-la-comunidad-del-anillo-pelicula-2001-1639853382.jpg?crop=1xw:0.9995061728395062xh;center,top&resize=2048:*",
      },
      {
        title: "Fast and Furious 9",
        year: 2022,
        image:
          "https://play-lh.googleusercontent.com/MqNI8XA23kWVd2VsWjnpe0Ureb0-K31qg5Fdcfi6dlzf-p2RPR-GV_JKxiI1wFK9c9GWwB1ITvemEoRVEA=w240-h480-rw",
      },
    ],
    favorita: {},
  };
  cambiarTitulo = () => {
    let { peliculas } = this.state;
    peliculas[0].title = "Batman begins";
    this.setState({
      peliculas: peliculas,
    });
  };

  favorita = (event) => {
    console.log("marcada como favorita");
    console.log(event);
    this.setState({
      favorita: event,
    });
  };

  render() {
    return (
      <React.Fragment>
        <Slider title={"Películas"} btn />
        <div className="center">
          <section id="content">
            <br/>
            <br/>
            {this.state.favorita.title && (
              <p>
                <b>La peliculas favorita es: </b>
                {this.state.favorita.title}
              </p>
            )}

            <button onClick={this.cambiarTitulo}>Cambiar titulo</button>
            {this.state.peliculas.map((pelicula, i) => {
              return (
                <Pelicula
                  key={i}
                  pelicula={pelicula}
                  fav={this.favorita}
                ></Pelicula> //las props las paso al componente hijo de esta manera
              );
            })}
          </section>
          <SideBar search/>
        </div>
      </React.Fragment>
    );
  }
}

export default Peliculas;
