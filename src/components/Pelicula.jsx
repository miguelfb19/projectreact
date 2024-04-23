import React, { Component } from "react";

class Pelicula extends Component {
  peliFav = () => {
    this.props.fav(this.props.pelicula);
  };
  render() {
    const { title, image, year } = this.props.pelicula; //las props me reciben atributos de otros componentes

    return (
      <React.Fragment>
        <div id="articles">
          <article className="article-item" id="article-template">
            <div className="image-wrap">
              <img src={image} alt={title} />
            </div>

            <h2>{title.toUpperCase()}</h2>
            <span className="date"> Hace 5 minutos </span>
            <span style={{ display: "block" }}>{year}</span>
            <button onClick={this.peliFav}>Marcar como favorita</button>
            
            <div className="clearfix"></div>
          </article>
        </div>
      </React.Fragment>
    );
  }
}

export default Pelicula;
