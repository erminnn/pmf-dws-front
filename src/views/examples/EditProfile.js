import React, { Component } from "react";
import axios from "axios";
import ReactDatetime from "react-datetime";
import { Link } from "react-router-dom";
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
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
export default class EditProfile extends Component {
  state = {
    id: "",
    username: "",
    firstName: "",
    lastName: "",
    profileImage: "",
    email: "",
    selectedCountry: "",
    selectedCity: "",
    dateOfBirth: "",
    countries: [],
    password: "",
    cities: [],
    isLoaded: false,
  };

  async componentDidMount() {
    const token = "Bearer " + localStorage.getItem("token");
    const username = localStorage.getItem("username");
    const config = {
      headers: {
        authorization: `${token}`,
      },
    };
    const response = await axios.get(
      "http://127.0.0.1:8080/user/findByUsername/" + username,
      config
    );
    let countriesResponse = await axios.get(
      "http://127.0.0.1:8080/country/all"
    );

    this.setState({
      ...this.state,
      countries: countriesResponse.data,
    });
    console.log(response);
  }

  handleChange = (event) => {
    this.setState(
      {
        [event.target.name]: event.target.value,
      },
      () => {
        console.log(this.state);
      }
    );
  };

  handleDateChange = (date) => {
    this.setState({
      dateOfBirth: date._d,
    });
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
      profileImage: event.target.files[0],
    });
  };

  saveProfileChanges = async () => {
    const {
      id,
      password,
      firstName,
      lastName,
      email,
      selectedCountry,
      selectedCity,
      dateOfBirth,
      profileImage,
    } = this.state;

    let profileImageURLResponse;
    let profileImageURL;

    const token = "Bearer " + localStorage.getItem("token");
    const username = localStorage.getItem("username");
    const config = {
      headers: {
        authorization: `${token}`,
      },
    };

    if (profileImage) {
      const fd = new FormData();
      fd.append("file", profileImage);
      fd.append("upload_preset", "immediately");
      profileImageURLResponse = await axios.post(
        "https://api.cloudinary.com/v1_1/dfts3meqq/image/upload",
        fd
      );

      profileImageURL = profileImageURLResponse.data.secure_url;
    }

    const editedUser = {
      id: null,
      username,
      password: password ? password : null,
      firstName: firstName ? firstName : null,
      lastName: lastName ? lastName : null,
      email: email ? email : null,
      dateOfBirth: dateOfBirth ? dateOfBirth.valueOf() : null,
      country: selectedCountry ? { id: selectedCountry } : null,
      city: selectedCity ? { id: selectedCity } : null,
      profileImage: profileImage ? profileImageURL : null,
    };

    console.log(editedUser);

    let updateResponse = await axios.post(
      "http://127.0.0.1:8080/user/profile/" + username + "/edit-profile",
      editedUser,
      config
    );

    this.props.history.push("/profile-page");
  };

  render() {
    const {
      username,
      password,
      firstName,
      lastName,
      email,
      countries,
      selectedCountry,
      cities,
      selectedCity,
      dateOfBirth,
      isLoaded,
    } = this.state;
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
                <h4 className="d-block text-uppercase font-weight-bold mb-4 align-items-center text-light">
                  Edit profile
                </h4>
              </Row>
              <Row className="justify-content-center">
                <Col lg="5">
                  <Form role="form" onSubmit={this.handleSubmit}>
                    <FormGroup>
                      <Label for="firstName" className="text-light">
                        First Name
                      </Label>
                      <InputGroup className="input-group-alternative mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-hat-3" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="Not required"
                          type="text"
                          name="firstName"
                          id="firstName"
                          onChange={this.handleChange}
                          value={firstName}
                        />
                      </InputGroup>
                    </FormGroup>
                    <FormGroup>
                      <Label for="lastName" className="text-light">
                        Last Name
                      </Label>
                      <InputGroup className="input-group-alternative mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-hat-3" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="Not required"
                          type="text"
                          name="lastName"
                          id="lastName"
                          onChange={this.handleChange}
                          value={lastName}
                        />
                      </InputGroup>
                    </FormGroup>
                    <FormGroup>
                      <Label for="dateOfBirth" className="text-light">
                        Birth Date
                      </Label>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-calendar-grid-58" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <ReactDatetime
                          inputProps={{
                            placeholder: "Not required",
                          }}
                          timeFormat={false}
                          value={dateOfBirth}
                          onChange={this.handleDateChange}
                          id="dateOfBirth"
                        />
                      </InputGroup>
                    </FormGroup>
                    <FormGroup>
                      <Label for="username" className="text-light">
                        Username
                      </Label>
                      <InputGroup className="input-group-alternative mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-hat-3" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="Not required"
                          type="text"
                          name="username"
                          id="username"
                          onChange={this.handleChange}
                          value={username}
                        />
                      </InputGroup>
                    </FormGroup>
                    <FormGroup>
                      <Label for="email" className="text-light">
                        Email
                      </Label>
                      <InputGroup className="input-group-alternative mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-email-83" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="Not required"
                          type="email"
                          name="email"
                          id="email"
                          onChange={this.handleChange}
                          value={email}
                        />
                      </InputGroup>
                    </FormGroup>
                    <FormGroup>
                      <Label for="password" className="text-light">
                        Password
                      </Label>
                      <InputGroup className="input-group-alternative mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-lock-circle-open" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="
                          Not required"
                          type="password"
                          name="password"
                          id="password"
                          onChange={this.handleChange}
                          value={password}
                        />
                      </InputGroup>
                      <div className="text-muted font-italic">
                        <small>
                          password strength:{" "}
                          {password.length >= 8 ? (
                            <span className="text-success font-weight-700">
                              strong
                            </span>
                          ) : (
                            <span className="text-danger font-weight-700">
                              weak
                            </span>
                          )}
                        </small>
                      </div>
                    </FormGroup>

                    <FormGroup>
                      <Label for="country" className="text-light">
                        Country(Not required)
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
                    {selectedCountry && !isLoaded ? (
                      <FormGroup>
                        <Label for="city" className="text-light">
                          City(Not required)
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
                          City(Not required)
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
                        Upload image(Not required)
                      </Label>

                      <CustomInput
                        type="file"
                        id="exampleFile"
                        name="file"
                        onChange={this.fileSelectedHandler}
                      />
                    </FormGroup>

                    <div className="text-center">
                      <Button
                        className="mt-4"
                        color="primary"
                        type="button"
                        onClick={this.saveProfileChanges}
                      >
                        Update Profile
                      </Button>
                    </div>
                  </Form>
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
