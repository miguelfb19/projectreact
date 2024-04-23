import React, { Component } from "react";
import logo from "../assets/images/logoreact.png";
import { NavLink, Link } from "react-router-dom";

class Header extends Component {
  render() {
    
    return (
      <header id="header">
        <div className="center">
          <div id="logo">
            <Link to='/home'>
            <img src={logo} className="appLogo" alt="Logotipo" />
            <span id="brand">
              <strong>Master</strong>React
            </span>
            </Link>
          </div>

          <nav id="menu">
            <ul>
              <li>
                <NavLink to="/home">Inicio</NavLink>
              </li>
              <li>
                <NavLink to="/blog">Blog</NavLink>
              </li>
              <li>
                <NavLink to="/form">Formulario</NavLink>
              </li>
              <li>
                <NavLink to="/peliculas">Películas</NavLink>
              </li>
              <li>
                <NavLink to="/pruebas">Pruebas</NavLink>
              </li>
            </ul>
          </nav>

          <div className="clearfix"></div>
        </div>
      </header>
    );
  }
}

export default Header;
