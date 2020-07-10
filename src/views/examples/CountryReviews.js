import React, { Component } from "react";
import CountryReviewCard from "./CountryReviewCard";
import axios from "axios";

import { Row, Col } from "reactstrap";

class CountryReviews extends Component {
  async componentDidMount() {
    const response = await axios.get(
      "http://127.0.0.1:8080/user-country-review/all"
    );
    console.log(response);
    this.setState({
      countries: response.data,
    });
  }

  state = {
    countries: [],
  };
  render() {
    return (
      <>
        <Row>
          <Col>
            {this.state.countries.map((countryReview) => (
              <Row>
                <CountryReviewCard
                  key={countryReview.id}
                  countryReview={countryReview}
                />
              </Row>
            ))}
          </Col>
        </Row>
      </>
    );
  }
}

export default CountryReviews;
