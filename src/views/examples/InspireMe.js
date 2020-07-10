import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";
import CountryReviews from "./CountryReviews";
import { Container, Row } from "reactstrap";
export default class InspireMe extends Component {
  render() {
    return (
      <>
        {" "}
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
            <DemoNavbar />
            <Container className="pt-lg-7">
              <Row className="justify-content-center">
                <CountryReviews />
              </Row>
            </Container>
          </section>
          <SimpleFooter />
        </div>
      </>
    );
  }
}
