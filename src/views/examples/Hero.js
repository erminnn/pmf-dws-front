import React from "react";

import { Button, Container, Row, Col } from "reactstrap";
import ImageSlider from "components/image_slider/ImageSlider";

class Hero extends React.Component {
  render() {
    return (
      <>
        <div className="position-relative">
          <section className="section section-hero section-shaped">
            {/* Background circles */}
            <div className="shape shape-style-1 shape-primary">
              <span className="span-150" />
              <span className="span-50" />
              <span className="span-50" />
              <span className="span-75" />
              <span className="span-100" />
              <span className="span-75" />
              <span className="span-50" />
              <span className="span-100" />
              <span className="span-50" />
              <span className="span-100" />
            </div>
            <Container className="shape-container d-flex align-items-center py-lg">
              <ImageSlider />
            </Container>
          </section>
        </div>
      </>
    );
  }
}

export default Hero;
