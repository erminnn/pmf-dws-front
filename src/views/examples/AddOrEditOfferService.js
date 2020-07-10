import React, { Component } from "react";
import axios from "axios";
import ReactDatetime from "react-datetime";
import { Link } from "react-router-dom";
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
import { map } from "jquery";
class OfferService extends Component {
  async componentDidMount() {
    const offerServiceId = this.props.match.params.id;
    const action = this.props.match.params.action;
    const token = "Bearer " + localStorage.getItem("token");
    const username = localStorage.getItem("username");
    const config = {
      headers: {
        authorization: `${token}`,
      },
    };

    const serviceTypes = await axios.get(
      "http://localhost:8080/service-type/all",
      config
    );

    const responseCountries = await axios.get(
      "http://127.0.0.1:8080/country/all"
    );

    if (action === "edit") {
      const responseUserOfferService = await axios.get(
        "http://127.0.0.1:8080/user-offer-service-type/offer-service/" +
          offerServiceId,
        config
      );
      const {
        id,
        serviceType,
        description,
        maxPerson,
        fromDate,
        toDate,
        serviceImg,
        address,
        country,
        city,
      } = responseUserOfferService.data;
      this.setState({
        id: id,
        action: "Edit",
        serviceType: serviceType,
        serviceDescription: description,
        serviceMaxPerson: maxPerson,
        serviceFromDate: fromDate,
        serviceToDate: toDate,
        serviceImage: serviceImg,
        serviceTypesFromDatabase: serviceTypes.data,
        serviceAddress: address,
        serviceSelectedCountry: country.id,
        serviceSelectedCity: city.id,
        countries: responseCountries.data,
      });
    } else {
      this.setState({
        ...this.state,
        ...this.state,
        serviceTypesFromDatabase: serviceTypes.data,
        countries: responseCountries.data,
        action: "Add",
        id: -1,
      });
    }
  }

  state = {
    id: "",
    action: "",
    serviceTypesFromDatabase: [],
    countries: [],
    cities: [],
    serviceType: 0,
    serviceDescription: "",
    serviceFromDate: "",
    serviceToDate: "",
    serviceMaxPerson: "",
    serviceSelectedCountry: "",
    serviceSelectedCity: "",
    serviceImage: "",
    serviceAddress: "",
    areCitiesLoaded: false,
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
      serviceImage: event.target.files[0],
    });
  };

  handleChangeServiceDateFrom = (date) => {
    this.setState({ ...this.state, serviceFromDate: date._d });
  };

  handleChangeServiceDateTo = (date) => {
    this.setState({ ...this.state, serviceToDate: date._d });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  submitOfferedService = async () => {
    const {
      id,
      action,
      serviceType,
      serviceDescription,
      serviceMaxPerson,
      serviceFromDate,
      serviceToDate,
      serviceImage,
      serviceAddress,
      serviceSelectedCountry,
      serviceSelectedCity,
    } = this.state;

    const serviceDateFrom = serviceFromDate.valueOf();
    const serviceDateTo = serviceToDate.valueOf();
    const user = localStorage.getItem("user_id");

    const fd = new FormData();
    fd.append("file", serviceImage);
    fd.append("upload_preset", "immediately-offer-service-images");
    const serviceImageURLResponse = await axios.post(
      "https://api.cloudinary.com/v1_1/dfts3meqq/image/upload",
      fd
    );

    const token = "Bearer " + localStorage.getItem("token");
    const config = {
      headers: {
        authorization: `${token}`,
      },
    };
    if (action === "Add") {
      const service = {
        user: {
          id: user,
        },
        serviceType: {
          id: serviceType,
        },
        description: serviceDescription,
        maxPerson: serviceMaxPerson,
        fromDate: serviceDateFrom,
        toDate: serviceDateTo,
        country: { id: serviceSelectedCountry },
        city: { id: serviceSelectedCity },
        serviceImg: serviceImageURLResponse.data.secure_url,
        address: serviceAddress,
      };
      let response = await axios.post(
        "http://localhost:8080/user-offer-service-type/add",
        service,
        config
      );
    } else if (action === "Edit") {
      const service = {
        id: id,
        user: {
          id: user,
        },
        serviceType: {
          id: serviceType,
        },
        description: serviceDescription,
        maxPerson: serviceMaxPerson,
        fromDate: serviceDateFrom,
        toDate: serviceDateTo,
        country: { id: serviceSelectedCountry },
        city: { id: serviceSelectedCity },
        serviceImg: serviceImageURLResponse.data.secure_url,
        address: serviceAddress,
      };

      let response = await axios.post(
        "http://localhost:8080/user-offer-service-type/offer-service/update",
        service,
        config
      );
    }

    this.setState({
      ...this.state,
      serviceType: 0,
      serviceDescription: "",
      serviceFromDate: "",
      serviceToDate: "",
      serviceMaxPerson: "",
      serviceAddress: "",
      serviceImage: "",
      serviceSelectedCity: "",
      serviceSelectedCountry: "",
    });

    this.props.history.push("/profile-page");
  };
  render() {
    const {
      action,
      serviceDescription,
      serviceFromDate,
      serviceMaxPerson,
      serviceToDate,
      serviceTypesFromDatabase,
      serviceImage,
      serviceSelectedCountry,
      serviceSelectedCity,
      countries,
      cities,
      areCitiesLoaded,
      serviceAddress,
    } = this.state;
    return (
      <>
        {" "}
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
                  Offer service
                </h4>
              </Row>
              <Row className="justify-content-center">
                <Col lg="5">
                  <FormGroup>
                    <InputGroup className="input-group-alternative mb-3">
                      <Input
                        type="select"
                        name="serviceType"
                        id="serviceType"
                        value={this.state.serviceType}
                        onChange={this.handleChange}
                        required
                      >
                        <option value="">Select service type</option>
                        {serviceTypesFromDatabase.map((el) => (
                          <option key={el.key} value={el.id}>
                            {el.name}
                          </option>
                        ))}
                      </Input>
                    </InputGroup>
                  </FormGroup>

                  <FormGroup>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-calendar-grid-58" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <ReactDatetime
                        inputProps={{
                          placeholder: "Offer service from date",
                        }}
                        timeFormat={false}
                        value={serviceFromDate}
                        onChange={this.handleChangeServiceDateFrom}
                      />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-calendar-grid-58" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <ReactDatetime
                        inputProps={{
                          placeholder: "Offer service to date",
                        }}
                        timeFormat={false}
                        value={serviceToDate}
                        onChange={this.handleChangeServiceDateTo}
                      />
                    </InputGroup>
                  </FormGroup>

                  <FormGroup>
                    <InputGroup className="input-group-alternative">
                      <Input
                        placeholder="Description"
                        type="textarea"
                        value={serviceDescription}
                        onChange={this.handleChange}
                        name="serviceDescription"
                      />
                    </InputGroup>
                  </FormGroup>

                  <FormGroup>
                    <InputGroup className="input-group-alternative">
                      <Input
                        placeholder="Max persons for service(Number)"
                        type="text"
                        value={serviceMaxPerson}
                        onChange={this.handleChange}
                        name="serviceMaxPerson"
                      />
                    </InputGroup>
                  </FormGroup>

                  <FormGroup>
                    <InputGroup className="input-group-alternative mb-3">
                      <Input
                        type="select"
                        name="serviceSelectedCountry"
                        id="selectedCountry"
                        value={serviceSelectedCountry}
                        onChange={this.loadCitiesForSelectedCountry}
                        required
                      >
                        <option value="">Select country</option>
                        {countries.map((el) => (
                          <option key={el.key} value={el.id}>
                            {el.name}
                          </option>
                        ))}
                      </Input>
                    </InputGroup>
                  </FormGroup>
                  {serviceSelectedCountry && !areCitiesLoaded ? (
                    <FormGroup>
                      <InputGroup className="input-group-alternative mb-3">
                        <Input
                          type="select"
                          name="serviceSelectedCity"
                          id="selectedCity"
                          value={serviceSelectedCity}
                          onChange={this.handleChange}
                          required
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
                      <InputGroup className="input-group-alternative mb-3">
                        <Input
                          type="select"
                          name="serviceSelectedCity"
                          id="selectedCity"
                          value={serviceSelectedCity}
                          onChange={this.handleChange}
                          required
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
                    <InputGroup className="input-group-alternative">
                      <Input
                        placeholder="Address"
                        type="text"
                        value={serviceAddress}
                        onChange={this.handleChange}
                        name="serviceAddress"
                      />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <Label for="exampleFile" className="text-light">
                      Upload image
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
                <div className="text-center">
                  <Button
                    className="mt-4"
                    color="primary"
                    type="button"
                    onClick={this.submitOfferedService}
                  >
                    {action} Offer
                  </Button>
                </div>
              </Row>
            </Container>
          </section>
          <SimpleFooter />
        </div>
      </>
    );
  }
}

export default OfferService;
