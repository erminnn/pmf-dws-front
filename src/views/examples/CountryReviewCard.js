import React, { Component } from "react";
import { Card, Button, Container, Row, Col } from "reactstrap";
export default class CountryReviewCard extends Component {
  render() {
    const {
      user,
      country,
      city,
      visitedPlaces,
      tripTitle,
      fromDate,
      toDate,
      description,
      tripImage,
      publicReview,
    } = this.props.countryReview;
    return (
      <Container>
        <Card
          className="border mb-2"
          body
          inverse
          color="secondary"
          body
          outline
          color="danger"
        >
          <Row className="text-center">
            <div className="col-lg-2 col-md-2 col-sm-12 col-xs-12 mt-3">
              <img
                alt="..."
                className="img-fluid rounded shadow mt-2 mx-auto d-block"
                src={tripImage}
                style={{ width: "200px", height: "150px" }}
              />
            </div>
            <div className="col-lg-2 col-md-2 col-sm-12 col-xs-12 mt-2">
              <h4>Title</h4>
              <div className="w-100"></div>
              <small className="d-block text-uppercase text-primary text-center font-weight-bold mb-2 mt-2">
                {tripTitle}
              </small>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12 mt-2">
              <h4>Details</h4>
              <div className="w-100"></div>
              <small className="d-block text-uppercase text-primary text-center font-weight-bold mb-2 mt-2">
                From date : {fromDate}
              </small>
              <div className="w-100"></div>
              <small className="d-block text-uppercase text-primary text-center font-weight-bold mb-2 mt-2">
                To date : {toDate}
              </small>
              <div className="w-100"></div>
              <small className=" text-primary text-center mb-2">
                <i className="fa fa-globe" aria-hidden="true"></i>
                {country.name + ", " + city.name}
              </small>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12 mt-2">
              <h4>Description</h4>
              <div className="w-100"></div>
              <small className=" text-primary text-center mb-2">
                {description}
              </small>
            </div>
            <div className="col-lg-2 col-md-2 col-sm-12 col-xs-12 mt-2">
              <h4>Visited places</h4>
              <div className="w-100"></div>
              <small className=" text-primary text-center mb-2">
                {visitedPlaces}
              </small>
            </div>
          </Row>
        </Card>
      </Container>
    );
  }
}
