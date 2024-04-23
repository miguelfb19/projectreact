import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class Slider extends Component {
  render() {
    return (
      <React.Fragment>
        <div id="slider" className={this.props.size}>
          <h1>
            {this.props.title}
          </h1>
          {this.props.btn && (
            <React.Fragment>
              <NavLink to="/blog" className="btn-white">
                Ir al Blog
              </NavLink>
            </React.Fragment>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default Slider;
