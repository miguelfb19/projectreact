import React, { Component } from "react";
import Slider from "./Slider";
import SideBar from "./SideBar";

class PruebasComp extends Component {
  //el STATE me sirve para guardar propiedades de mi componente que van a funcionar de forma reactiva
  state = {
    contador: 0,
  };

  // en REACT para poder pasar metodos en los eventos debo crearlos con FUNCIONES FLECHA
  sumar = () => {
    this.setState({
      contador: this.state.contador + 1,
    });
  };

  restar = () => {
    this.setState({
      contador: this.state.contador - 1,
    });
  };
  render() {
    return (
      <React.Fragment>
        <Slider btn title="Componente de pruebas" />
        <div className="center">
          <section id="content">
            <h1>HOLA SOY EL COMPONENTE DE PRUEBAS</h1>
            <p>Esto es una pruebas</p>

            <hr></hr>
            <span>{this.state.contador}</span>
            <div>
              <input type="button" value="Sumar" onClick={this.sumar} />
              <input type="button" value="Restar" onClick={this.restar} />
            </div>
          </section>
          <SideBar search/>
        </div>
      </React.Fragment>
    );
  }
}

export default PruebasComp;
