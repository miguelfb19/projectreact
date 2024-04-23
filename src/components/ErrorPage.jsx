import React, { Component } from "react";

class ErrorPage extends Component {
  render() {
    return (
      <React.Fragment>
        <h1 className="sub-header">Página no encontrada</h1>
        <h2>La página a la que estas intentando acceder no exíste</h2>
        <a href="/home">Volver al inicio</a>
      </React.Fragment>
    );
  }
}

export default ErrorPage;
