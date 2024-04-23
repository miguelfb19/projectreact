import React, { useRef } from "react";
import { NavLink, useNavigate,  } from "react-router-dom";

const SideBar =(props)=> { //en componentes funcionales las PROPS se pasans como arcumentos de la funcion y se crear las variables respectivas (siguiente linea)
  const {create, search}=props 
  const searchString = useRef(null)
  const navigate = useNavigate()

  const Buscar = (event) => {
    event.preventDefault()
    let searchTerm = searchString.current.value.trim();
    if (searchTerm === "") {
      navigate(`/blog/search/""`);
    } else {
      navigate(`/blog/search/${searchTerm}`);
    }
    searchString.current.value=''
  };
  
    return (
      <React.Fragment>
        <aside id="sidebar">
          {create && (
            <nav id="nav-blog" className="sidebar-item">
              <h3>Puedes hacer esto</h3>
              <NavLink to="/blog/create" className="btn">
                Crear artículo
              </NavLink>
            </nav>
          )}
          {search && (
            <div id="search" className="sidebar-item">
              <h3>Buscador</h3>
              <p>Encuentra el artículo que buscas</p>
              <form onSubmit={Buscar}>
                <input type="text" name="search" ref={searchString}/>
                <input
                  type="submit"
                  name="submit"
                  value="buscar"
                  className="btn"
                />
              </form>
            </div>
          )}
        </aside>
        <div className="clearfix"></div>
      </React.Fragment>
    );
  
}

export default SideBar;
