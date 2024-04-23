import React, { Component } from "react";
import Slider from "./Slider";
import SideBar from "./SideBar";
import Articles from "./Articles";

class Blog extends Component {
  title = "Blog";
  sliderSize = "slider-small";

  render() {
    return (
      <React.Fragment>
        <Slider size={this.sliderSize} title={this.title} />
        <div className="center">
          <section id="content">
            <Articles />
          </section>
          <SideBar create search />
        </div>
      </React.Fragment>
    );
  }
}

export default Blog;
