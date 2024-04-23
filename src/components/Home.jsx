import React, { Component } from "react";
import Slider from "./Slider";
import SideBar from "./SideBar";
import Articles from "./Articles";

class Home extends Component {
  title = "Bienvenidos al blog de Miguel desarrollado den React";
  state = {
    articlesLast: [],
  };
  render() {
    return (
      <React.Fragment>
        <Slider btn title={this.title} />
        <div className="center">
          <section id="content">
            <Articles lastArticles/>
          </section>
          <SideBar search/>
        </div>
      </React.Fragment>
    );
  }
}

export default Home;
