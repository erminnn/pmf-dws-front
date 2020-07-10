import React, { Component } from "react";
import axios from "axios";
import ReactDatetime from "react-datetime";
import { Link } from "react-router-dom";
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";
import CountryReviewCard from "./CountryReviewCard";
import {
  Button,
  Card,
  Container,
  Row,
  Label,
  Col,
  NavLink,
  CustomInput,
} from "reactstrap";
class UserCountryReview extends Component {
  async componentDidMount() {
    const token = "Bearer " + localStorage.getItem("token");
    const username = localStorage.getItem("username");
    const config = {
      headers: {
        authorization: `${token}`,
      },
    };

    const responseUserCountryReview = await axios.get(
      "http://127.0.0.1:8080/user-country-review/" + username,
      config
    );

    this.setState({
      ...this.state,
      userCountryReviews: responseUserCountryReview.data,
    });
  }

  state = {
    userCountryReviews: [],
  };

  deleteCountryReview = async (id) => {
    const token = "Bearer " + localStorage.getItem("token");
    const username = localStorage.getItem("username");
    const config = {
      headers: {
        authorization: `${token}`,
      },
    };
    this.setState({
      ...this.state,
      userCountryReviews: this.state.userCountryReviews.filter(
        (el) => el.id !== id
      ),
    });

    console.log(token);

    let response = axios.delete(
      "http://localhost:8080/user-country-review/delete/" + id,

      config
    );
    console.log(response);
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
            <Container>
              <Row>
                <Col>
                  <Button
                    className="mt-1 mr-1 float-right"
                    color="primary"
                    type="button"
                  >
                    <NavLink
                      to={"/country-review/-1/add"}
                      tag={Link}
                      className="text-white pt-0 pb-0"
                    >
                      Add
                    </NavLink>
                  </Button>
                </Col>
              </Row>
            </Container>

            <Container className="pt-lg-7 mt-0">
              <Row>
                <Col>
                  {this.state.userCountryReviews.map((countryReview) => (
                    <>
                      <Row>
                        <Col className="mb-1">
                          <Button
                            className="mt-1 mr-1 float-right"
                            color="primary"
                            type="button"
                          >
                            <NavLink
                              to={
                                "/country-review/" + countryReview.id + "/edit"
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
                            onClick={this.deleteCountryReview.bind(
                              this,
                              countryReview.id
                            )}
                          >
                            Delete
                          </Button>
                        </Col>
                      </Row>

                      <Row>
                        <CountryReviewCard
                          key={countryReview.id}
                          countryReview={countryReview}
                        />
                      </Row>
                    </>
                  ))}
                </Col>
              </Row>
            </Container>
          </section>
          <SimpleFooter />
        </div>
      </>
    );
  }
}

export default UserCountryReview;
