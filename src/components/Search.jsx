import React, { useEffect, useState } from "react";
import Slider from "./Slider";
import SideBar from "./SideBar";
import Articles from "./Articles";
import { useParams } from "react-router-dom";

const Search = ()=>{

    const {searchString}=useParams() 
    const [Query, setQuery]= useState(searchString)

    useEffect(()=>{
      setQuery(searchString)
    }, [searchString])

    return (
        <React.Fragment>
          <Slider size='slider-small' title={`Busqueda: ${Query}`} />
          <div className="center">
            <section id="content">
              <Articles searchString={Query}/>
            </section>
            <SideBar create search/>
          </div>
        </React.Fragment>
      );
}

export default Search