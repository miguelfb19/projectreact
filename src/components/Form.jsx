import React, { Component } from "react";
import SideBar from "./SideBar";
import Slider from "./Slider";

class Form extends Component {
  nombre = React.createRef();
  apellidos = React.createRef();
  comentarios = React.createRef();
  hombre = React.createRef();
  mujer = React.createRef();

  state = {
    user: {}
  };

  recibirForm = (event) => {
    event.preventDefault(); //esto me ayuda para que no se me recargue la pagina por defecto

    let sex = "";

    if (this.hombre.current.checked) {
      sex = this.hombre.current.value;
    } else if (this.mujer.current.checked) {
      sex = this.mujer.current.value;
    }

    let user = {
      nombre: this.nombre.current.value,
      apellidos: this.apellidos.current.value,
      comentarios: this.comentarios.current.value,
      sexo: sex,
    };

    console.log(user);
    
    this.setState({
      user: user
    })
  };

  
  render() {
    return (
      <React.Fragment>
        <Slider title="Formulario" size="slider-small" />
        <div className="center">
          <section id="content">
            <br />
            <div className="sub-header" />
            <br />
            <form className="mid-form" onSubmit={this.recibirForm} onChange={this.recibirForm}>
              <div className="form-group">
                <label htmlFor="nombre">Nombre:</label>
                <input type="text" name="nombre" ref={this.nombre} />
              </div>
              <div className="form-group">
                <label htmlFor="apellidos">Apellidos:</label>
                <input type="text" name="apellidos" ref={this.apellidos} />
              </div>
              <p>Selecciona tu sexo:</p>
              <div className="form-group radiobuttoms">
                <input
                  type="radio"
                  name="sexo"
                  value="hombre"
                  ref={this.hombre}
                />
                Hombre
                <input
                  type="radio"
                  name="sexo"
                  value="mujer"
                  ref={this.mujer}
                />
                Mujer
                <div className="clearfix"></div>
              </div>
              <div className="clearfix"></div>
              <div className="form-group">
                <label htmlFor="coment">Comentarios:</label>
                <textarea name="coment" ref={this.comentarios}></textarea>
                <div className="clearfix"></div>
              </div>

              <div className="buttomsform">
                <input
                  type="submit"
                  value="Enviar"
                  className="btn btn-succes buttonsform1"
                />
                <input
                  type="reset"
                  value="Borrar"
                  className="btn btn-succes buttonsform2"
                />
              </div>
            </form>
            {this.state.user.nombre &&
            <div className="center">
            <table className="datosForm">
              <thead>
                <tr>
                  <th>NOMBRE</th>
                  <th>APELLIDOS</th>
                  <th>SEXO</th>
                  <th>COMENTARIOS</th>
                </tr>
              </thead>
              <tbody>
                <td>{this.state.user.nombre}</td>
                <td>{this.state.user.apellidos}</td>
                <td>{this.state.user.sexo}</td>
                <td>{this.state.user.comentarios}</td>
              </tbody>
            </table>
          </div>}
            
          </section>
          <SideBar search create />
        </div>
      </React.Fragment>
    );
  }
}

export default Form;
