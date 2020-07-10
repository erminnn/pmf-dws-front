import React, { Component } from "react";
import ReactDatetime from "react-datetime";
import { Link } from "react-router-dom";
import axios from "axios";
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";

import {
  Button,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Label,
  Col,
  NavLink,
  CustomInput,
} from "reactstrap";
export default class AddOrEditUserCountryReview extends Component {
  async componentDidMount() {
    const countryReviewId = this.props.match.params.id;
    const action = this.props.match.params.action;
    const token = "Bearer " + localStorage.getItem("token");
    const username = localStorage.getItem("username");
    const config = {
      headers: {
        authorization: `${token}`,
      },
    };

    const responseCountries = await axios.get(
      "http://127.0.0.1:8080/country/all"
    );

    if (action === "edit") {
      console.log(countryReviewId, action);
      const responseUserCountryReview = await axios.get(
        "http://127.0.0.1:8080/user-country-review/country-review/" +
          countryReviewId,
        config
      );
      console.log(responseUserCountryReview.data);
      const {
        tripTitle,
        description,
        fromDate,
        toDate,
        tripImage,
        visitedPlaces,
        selectedCountry,
        selectedCity,
        areCitiesLoaded,
        publicReview,
      } = responseUserCountryReview.data;

      this.setState({
        id: countryReviewId,
        action: "Edit",
        tripName: tripTitle,
        description,
        fromDate,
        toDate,
        tripImage,
        visitedPlaces,
        selectedCountry,
        selectedCity,
        areCitiesLoaded,
        publicReview,
        countries: responseCountries.data,
      });
    } else {
      this.setState({
        ...this.state,
        countries: responseCountries.data,
        action: "Add",
        id: -1,
      });
    }
  }

  state = {
    id: "",
    action: "",
    tripName: "",
    countries: [],
    cities: [],
    description: "",
    fromDate: "",
    toDate: "",
    selectedCountry: "",
    selectedCity: "",
    tripImage: "",
    visitedPlaces: "",
    areCitiesLoaded: false,
    publicReview: false,
  };

  loadCitiesForSelectedCountry = async (event) => {
    let countryId = event.target.value;
    await this.setState({
      [event.target.name]: event.target.value,
    });
    try {
      let response = await axios.get(
        "http://127.0.0.1:8080/city/country-id/" + countryId
      );

      this.setState({ ...this.state, cities: response.data });
      console.log(this.state);
    } catch (e) {
      console.error(e);
    }
  };

  fileSelectedHandler = (event) => {
    this.setState({
      ...this.state,
      tripImage: event.target.files[0],
    });
  };

  handleChangeServiceDateFrom = (date) => {
    this.setState({ ...this.state, fromDate: date._d });
  };

  handleChangeServiceDateTo = (date) => {
    this.setState({ ...this.state, toDate: date._d });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  submitCountryReview = async () => {
    const {
      id,
      action,
      tripName,
      description,
      fromDate,
      toDate,
      tripImage,
      visitedPlaces,
      selectedCountry,
      selectedCity,
      areCitiesLoaded,
      publicReview,
    } = this.state;

    const countryReview = {
      tripName,
      description,
      fromDate,
      toDate,
      tripImage,
      visitedPlaces,
      selectedCountry,
      selectedCity,
      areCitiesLoaded,
      publicReview,
    };

    const dateFrom = fromDate.valueOf();
    const dateTo = toDate.valueOf();
    const user = localStorage.getItem("user_id");

    const fd = new FormData();
    fd.append("file", tripImage);
    fd.append("upload_preset", "immediately-country-review");
    const tripImageURLResponse = await axios.post(
      "https://api.cloudinary.com/v1_1/dfts3meqq/image/upload",
      fd
    );

    const token = "Bearer " + localStorage.getItem("token");
    const config = {
      headers: {
        authorization: `${token}`,
      },
    };
    console.log(action);
    if (action === "Add") {
      console.log("usao add");

      const countryReviewDetails = {
        user: {
          id: user,
        },
        description: description,
        fromDate: dateFrom,
        toDate: dateTo,
        visitedPlaces: visitedPlaces,
        tripTitle: tripName,
        country: { id: selectedCountry },
        city: { id: selectedCity },
        tripImage: tripImageURLResponse.data.secure_url,
        publicReview: publicReview,
      };
      let response = await axios.post(
        "http://localhost:8080/user-country-review/add",
        countryReviewDetails,
        config
      );
      console.log(response);
    } else if (action === "Edit") {
      console.log("usao edit", user);

      const countryReviewDetails = {
        id: id,
        user: {
          id: user,
        },
        description: description,
        fromDate: dateFrom,
        toDate: dateTo,
        visitedPlaces: visitedPlaces,
        tripTitle: tripName,
        country: { id: selectedCountry },
        city: { id: selectedCity },
        tripImage: tripImageURLResponse.data.secure_url,
        publicReview: publicReview,
      };

      let response = await axios.post(
        "http://localhost:8080/user-country-review/country-review/update",
        countryReviewDetails,
        config
      );
      console.log(countryReviewDetails);
    }

    this.setState({
      tripName: "",
      description: "",
      fromDate: "",
      toDate: "",
      selectedCountry: "",
      selectedCity: "",
      tripImage: "",
      visitedPlaces: "",
      areCitiesLoaded: false,
      publicReview: false,
    });

    this.props.history.push("/profile-page");
  };
  render() {
    const {
      action,
      tripName,
      description,
      fromDate,
      toDate,
      tripImage,
      visitedPlaces,
      countries,
      cities,
      selectedCountry,
      selectedCity,
      publicReview,
      areCitiesLoaded,
    } = this.state;
    return (
      <div className="position-relative">
        {/* Hero for FREE version */}
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
              <h4 className="d-block text-uppercase font-weight-bold mb-4 align-items-center text-light">
                Country Review
              </h4>
            </Row>
            <Row className="justify-content-center">
              <Col lg="5">
                <FormGroup>
                  <Label for="tripName" className="text-light">
                    The name of the trip
                  </Label>
                  <InputGroup className="input-group-alternative">
                    <Input
                      type="text"
                      id="tripName"
                      value={tripName}
                      onChange={this.handleChange}
                      name="tripName"
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <Label for="fromDate" className="text-light">
                    Trip start date
                  </Label>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-calendar-grid-58" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <ReactDatetime
                      inputProps={{}}
                      timeFormat={false}
                      value={fromDate}
                      onChange={this.handleChangeServiceDateFrom}
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <Label for="fromDate" className="text-light">
                    Trip end date
                  </Label>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-calendar-grid-58" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <ReactDatetime
                      inputProps={{}}
                      timeFormat={false}
                      value={toDate}
                      onChange={this.handleChangeServiceDateTo}
                    />
                  </InputGroup>
                </FormGroup>

                <FormGroup>
                  <Label for="description" className="text-light">
                    Describe your trip
                  </Label>
                  <InputGroup className="input-group-alternative">
                    <Input
                      type="textarea"
                      value={description}
                      onChange={this.handleChange}
                      name="description"
                    />
                  </InputGroup>
                </FormGroup>

                <FormGroup>
                  <Label for="visitedPlaces" className="text-light">
                    Visited places
                  </Label>
                  <InputGroup className="input-group-alternative">
                    <Input
                      type="textarea"
                      value={visitedPlaces}
                      onChange={this.handleChange}
                      name="visitedPlaces"
                    />
                  </InputGroup>
                </FormGroup>

                <FormGroup>
                  <Label for="country" className="text-light">
                    Country
                  </Label>
                  <InputGroup className="input-group-alternative mb-3">
                    <Input
                      type="select"
                      name="selectedCountry"
                      id="country"
                      value={selectedCountry}
                      onChange={this.loadCitiesForSelectedCountry}
                    >
                      <option value="">Select country </option>
                      {countries.map((el) => (
                        <option key={el.key} value={el.id}>
                          {el.name}
                        </option>
                      ))}
                    </Input>
                  </InputGroup>
                </FormGroup>
                {selectedCountry && !areCitiesLoaded ? (
                  <FormGroup>
                    <Label for="city" className="text-light">
                      City
                    </Label>
                    <InputGroup className="input-group-alternative mb-3">
                      <Input
                        type="select"
                        name="selectedCity"
                        id="city"
                        value={selectedCity}
                        onChange={this.handleChange}
                      >
                        <option value="">Select city</option>
                        {cities.length != 0 &&
                          cities.map((el) => (
                            <option key={el.key} value={el.id}>
                              {el.name}
                            </option>
                          ))}
                      </Input>
                    </InputGroup>
                  </FormGroup>
                ) : (
                  <FormGroup>
                    <Label for="city" className="text-light">
                      City
                    </Label>
                    <InputGroup className="input-group-alternative mb-3">
                      <Input
                        type="select"
                        name="selectedCity"
                        id="city"
                        value={selectedCity}
                        onChange={this.handleChange}
                      >
                        <option value="">Select city</option>
                        {cities.length != 0 &&
                          cities.map((el) => (
                            <option key={el.key} value={el.id}>
                              {el.name}
                            </option>
                          ))}
                      </Input>
                    </InputGroup>
                  </FormGroup>
                )}

                <FormGroup>
                  <Label for="exampleFile" className="text-light">
                    Upload favourite image from trip
                  </Label>

                  <CustomInput
                    type="file"
                    id="exampleFile"
                    name="file"
                    onChange={this.fileSelectedHandler}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row className="justify-content-center">
              <Col xs="12" lg="5">
                <Label for="exampleFile" className="text-light">
                  Can we use this country review to inspire other people
                </Label>
                <div className="custom-control custom-radio mb-3">
                  <input
                    className="custom-control-input"
                    id="customRadio1"
                    name="publicReview"
                    type="radio"
                    onChange={this.handleChange}
                    value={false}
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="customRadio1"
                  >
                    <span>No</span>
                  </label>
                </div>
                <div className="custom-control custom-radio mb-3">
                  <input
                    className="custom-control-input"
                    id="customRadio2"
                    name="publicReview"
                    type="radio"
                    onChange={this.handleChange}
                    value={true}
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="customRadio2"
                  >
                    <span>Yes</span>
                  </label>
                </div>
              </Col>
            </Row>
            <Row className="justify-content-center">
              <div className="text-center">
                <Button
                  className="mt-4"
                  color="primary"
                  type="button"
                  onClick={this.submitCountryReview}
                >
                  {action} country review
                </Button>
              </div>
            </Row>
          </Container>
        </section>
        <SimpleFooter />
      </div>
    );
  }
}
