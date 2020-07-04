import React, { Component } from "react";
import b1 from "./sarajevo.jpg";
import b2 from "./mostar.jpg";
import b3 from "./dubrovnik.jpg";
import "components/image_slider/slider.css";
class ImageSlider extends Component {
  render() {
    return (
      <>
        <div id="slides" className="carousel slide" data-ride="carousel">
          <ul className="carousel-indicators">
            <li data-target="#slides" data-slide-to="0" className="active"></li>
            <li data-target="#slides" data-slide-to="1"></li>
            <li data-target="#slides" data-slide-to="2"></li>
          </ul>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img alt="..." src={b1} />
            </div>
            <div className="carousel-item">
              <img alt="..." src={b2} />
            </div>
            <div className="carousel-item">
              <img alt="..." src={b3} />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default ImageSlider;
