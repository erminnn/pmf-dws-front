import React, { Component } from "react";
import UserOfferCard from "./UserOfferCard";
import axios from "axios";

import { Link } from "react-router-dom";
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";
import CountryReviews from "./CountryReviews";
import { Container, Row, Col } from "reactstrap";

class UserOfferServices extends Component {
  async componentDidMount() {
    const userOfferServicesResponse = await axios.get(
      "http://localhost:8080/user-offer-service-type/all"
    );
    console.log(userOfferServicesResponse.data);

    this.setState({ offeredServices: userOfferServicesResponse.data });
  }

  state = {
    offeredServices: [],
  };
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
                <Row>
                  <Col>
                    {this.state.offeredServices.map((service) => (
                      <UserOfferCard key={service.id} service={service} />
                    ))}
                  </Col>
                </Row>
              </Row>
            </Container>
          </section>
          <SimpleFooter />
        </div>
      </>
    );
  }
}

export default UserOfferServices;
