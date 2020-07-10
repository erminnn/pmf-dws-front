import React, { Component } from "react";
import { Card, Button, Container, Row, Col } from "reactstrap";
class UserOfferCard extends Component {
  render() {
    const {
      user,
      toDate,
      serviceType,
      maxPerson,
      fromDate,
      description,
      serviceImg,
      country,
      city,
      address,
    } = this.props.service;
    return (
      <Container>
        <Card className="border mb-2">
          <Row className="text-center">
            <div className="col-lg-2 col-md-2 col-sm-12 col-xs-12 mt-3">
              <img
                alt="..."
                className="img-fluid rounded shadow mt-2 mx-auto d-block"
                src={serviceImg}
                style={{ width: "150px", height: "150px" }}
              />
            </div>
            <div className="col-lg-2 col-md-2 col-sm-12 col-xs-12 mt-2">
              <h4>Owner</h4>
              <div className="w-100"></div>
              <small className="d-block text-uppercase text-center font-weight-bold mb-2 mt-2">
                {user.firstName + " " + user.lastName}
              </small>

              <small className="d-block text-primary text-center mb-2">
                <i className="fa fa-globe" aria-hidden="true"></i>
                {country.name + ", " + city.name}
              </small>

              <div className="w-100"></div>
              <small className=" text-primary text-center mb-2">
                Address : {address}
              </small>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12 mt-2">
              <h4>Details</h4>
              <div className="w-100"></div>
              <small className=" text-primary text-center mb-2">
                From date : {fromDate}
              </small>
              <div className="w-100"></div>
              <small className=" text-primary text-center mb-2 mt-2">
                To date : {toDate}
              </small>
              <div className="w-100"></div>
              <small className=" text-primary text-center mb-2 mt-2">
                Service : {serviceType.name}
              </small>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12 mt-2">
              <h4>Description</h4>
              <div className="w-100"></div>
              <small className=" text-primary text-center mb-2">
                {description}
                aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
              </small>
            </div>

            <div className="col-lg-2 col-md-2 col-sm-12 col-xs-12 mt-2 ">
              <h4>Email me</h4>
              <div className="w-100"></div>
              <small className=" text-primary text-center mb-2">
                {user.email}
              </small>
            </div>
          </Row>
        </Card>
      </Container>
    );
  }
}

export default UserOfferCard;
