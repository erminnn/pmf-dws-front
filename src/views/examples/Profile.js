import React from "react";
import axios from "axios";
import moment from "moment";
import { Link } from "react-router-dom";
import UserOfferCard from "./UserOfferCard.js";
// reactstrap components
import { Button, Card, Container, Row, Col, NavLink } from "reactstrap";

import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";

class Profile extends React.Component {
  async componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
    const token = "Bearer " + localStorage.getItem("token");
    const username = localStorage.getItem("username");
    const config = {
      headers: {
        authorization: `${token}`,
      },
    };

    let userDetails;
    const userOfferServiceResponse = await axios.get(
      "http://localhost:8080/user-offer-service-type/" + username,
      config
    );

    if (userOfferServiceResponse.data.length === 0) {
      const userDetailsResponse = await axios.get(
        "http://localhost:8080/user/findByUsername/" + username,
        config
      );
      userDetails = userDetailsResponse.data;
    } else {
      userDetails = userOfferServiceResponse.data[0].user;
    }

    const {
      firstName,
      lastName,
      profileImage,
      country,
      city,
      dateOfBirth,
      email,
      id,
    } = userDetails;
    const age = this.getAge(dateOfBirth);
    this.setState({
      ...this.state,
      profileImage: profileImage,
      firstName: firstName,
      lastName: lastName,
      offeredServices: userOfferServiceResponse.data,
      age: age,
      country: country.name,
      city: city.name,
      email: email,
    });
  }

  getAge = (dateOfBirth) => {
    let startDate = new Date(dateOfBirth);
    let endDate = new Date();

    const age = moment.duration(endDate - startDate).years();
    return age;
  };

  deleteOfferedService = async (id) => {
    const token = "Bearer " + localStorage.getItem("token");
    const username = localStorage.getItem("username");
    const config = {
      headers: {
        authorization: `${token}`,
      },
    };
    this.setState({
      ...this.state,
      offeredServices: this.state.offeredServices.filter((el) => el.id !== id),
    });

    console.log(token);

    let response = axios.delete(
      "http://localhost:8080/user-offer-service-type/offer-service/delete/" +
        id,

      config
    );
    console.log(response);
  };

  state = {
    profileImage: null,
    offeredServices: [],
    age: 0,
    firstName: "",
    lastName: "",
    country: "",
    city: "",
    email: "",
  };

  render() {
    const {
      firstName,
      lastName,
      profileImage,
      country,
      city,
      age,
      email,
      offeredServices,
    } = this.state;
    return (
      <>
        <DemoNavbar />

        <main className="profile-page" ref="main">
          <section className="section-profile-cover section-shaped my-0">
            {/* Circles background */}
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
            {/* SVG separator */}
            <div className="separator separator-bottom separator-skew">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
              >
                <polygon
                  className="fill-white"
                  points="2560 0 2560 100 0 100"
                />
              </svg>
            </div>
          </section>
          <section className="section">
            <Container>
              <Card className="card-profile shadow mt--300">
                <div className="px-4">
                  <Row className="justify-content-center">
                    <Col className="order-lg-2" lg="3">
                      <div className="card-profile-image">
                        <a href="#pablo" onClick={(e) => e.preventDefault()}>
                          <img
                            alt="..."
                            className="img-fluid rounded shadow-lg"
                            src={profileImage}
                          />
                        </a>
                      </div>
                    </Col>
                    <Col
                      className="order-lg-3 text-lg-right align-self-lg-center"
                      lg="4"
                    >
                      <div className="card-profile-actions py-4 mt-lg-0">
                        <Row>
                          <Col>
                            <Button
                              className="mr-4 float-left p-1"
                              color="info"
                              size="sm"
                            >
                              <NavLink
                                to="/edit-profile"
                                tag={Link}
                                className="text-white "
                              >
                                Edit Profile
                              </NavLink>
                            </Button>
                          </Col>
                          <Col>
                            <Button
                              className="float-right p-1px"
                              color="default"
                              size="sm"
                            >
                              <NavLink
                                to="/offer-service/-1/add"
                                tag={Link}
                                className="text-white"
                              >
                                OFFER A SERVICE
                              </NavLink>
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    </Col>
                    <Col className="order-lg-1" lg="4">
                      <div className="card-profile-stats d-flex justify-content-center">
                        <div>
                          <span className="heading">
                            {offeredServices.length}
                          </span>
                          <span className="description">Offered Services</span>
                        </div>
                        <div>
                          <span className="heading">
                            {offeredServices.length}
                          </span>
                          <span className="description">Photos</span>
                        </div>
                        <div>
                          <span className="heading">89</span>
                          <span className="description">Comments</span>
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <div className="text-center mt-5">
                    <h3>
                      {firstName + " " + lastName}
                      <span className="font-weight-light">, {age}</span>
                    </h3>
                    <div className="h6 font-weight-300">
                      <i className="ni location_pin mr-2" />
                      {city}, {country}
                    </div>
                    <div className="h6 mt-4">
                      <i className="ni business_briefcase-24 mr-2" />
                      {email}
                    </div>
                    <div>
                      <i className="ni education_hat mr-2" />
                      University of Computer Science
                    </div>
                  </div>
                  <div className="mt-5 py-5 border-top text-center">
                    <Row className="justify-content-center">
                      <Col lg="12">
                        {" "}
                        <Row>
                          <Col>
                            {this.state.offeredServices.map((service) => (
                              <div key={service.id}>
                                <Row>
                                  <Col className="mb-1">
                                    <Button
                                      className="mt-1 mr-1 float-right"
                                      color="primary"
                                      type="button"
                                    >
                                      <NavLink
                                        to={
                                          "/offer-service/" +
                                          service.id +
                                          "/edit"
                                        }
                                        tag={Link}
                                        className="text-white pt-0 pb-0"
                                      >
                                        Edit
                                      </NavLink>
                                    </Button>
                                    <Button
                                      className="mt-1 mr-1 float-right"
                                      color="danger"
                                      type="button"
                                      onClick={this.deleteOfferedService.bind(
                                        this,
                                        service.id
                                      )}
                                    >
                                      Delete
                                    </Button>
                                  </Col>
                                </Row>{" "}
                                <Row>
                                  <UserOfferCard
                                    key={service.id}
                                    service={service}
                                  />{" "}
                                </Row>
                              </div>
                            ))}
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </div>
                </div>
              </Card>
            </Container>
          </section>
        </main>
        <SimpleFooter />
      </>
    );
  }
}

export default Profile;
