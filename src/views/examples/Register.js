import React from "react";
import axios from "axios";
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
  Col,
} from "reactstrap";

import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";
import ReactDatetime from "react-datetime";

class Register extends React.Component {
  async componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
    let response = await axios.get("http://127.0.0.1:8080/country/all");
    this.setState({ ...this.state, countries: response.data });
  }

  state = {
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    address: "",
    selectedCountry: "",
    selectedCity: "",
    dateOfBirth: "",
    countries: [],
    cities: [],
    isLoaded: false,
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const {
      username,
      password,
      firstName,
      lastName,
      email,
      selectedCountry,
      selectedCity,
      address,
      dateOfBirth,
    } = this.state;

    let date = dateOfBirth.valueOf();

    const user = {
      username,
      password,
      firstName,
      lastName,
      email,
      address,
      dateOfBirth: date,
      country: { id: selectedCountry },
      city: { id: selectedCity },
    };

    try {
      let response = axios.post("http://127.0.0.1:8080/user/register", user);
      this.props.history.push("/login");

      console.log(user);
    } catch (e) {
      console.error(e);
    }
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleDateChange = (date) => {
    this.setState({
      dateOfBirth: date._d,
    });
  };

  loadCitiesForSelectedCountry = async () => {
    const { countries, selectedCountry } = this.state;
    let countryId;
    countries.map((el) => (el.id == selectedCountry ? (countryId = el.id) : 0));
    try {
      let response = await axios.get(
        "http://127.0.0.1:8080/city/country-id/" + countryId
      );
      this.setState({ ...this.state, cities: response.data, isLoaded: true });
      console.log(this.state);
    } catch (e) {
      console.error(e);
    }
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
      address,
      selectedCity,
      dateOfBirth,
      isLoaded,
    } = this.state;
    return (
      <>
        <DemoNavbar />
        <main ref="main">
          <section className="section section-shaped section-lg">
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
            <Container className="pt-lg-7">
              <Row className="justify-content-center">
                <Col lg="5">
                  <Card className="bg-secondary shadow border-0">
                    <CardHeader className="bg-white pb-5">
                      <div className="text-muted text-center mb-3">
                        <h3 className="text-primary">Sign up</h3>
                      </div>
                    </CardHeader>
                    <CardBody className="px-lg-5 py-lg-5">
                      <Form role="form" onSubmit={this.handleSubmit}>
                        <FormGroup>
                          <InputGroup className="input-group-alternative mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-hat-3" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="First Name"
                              type="text"
                              name="firstName"
                              onChange={this.handleChange}
                              value={firstName}
                              required
                            />
                          </InputGroup>
                        </FormGroup>
                        <FormGroup>
                          <InputGroup className="input-group-alternative mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-hat-3" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="Last Name"
                              type="text"
                              name="lastName"
                              onChange={this.handleChange}
                              value={lastName}
                              required
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
                                placeholder: "Date of birth",
                              }}
                              timeFormat={false}
                              value={dateOfBirth}
                              onChange={this.handleDateChange}
                              required
                            />
                          </InputGroup>
                        </FormGroup>
                        <FormGroup>
                          <InputGroup className="input-group-alternative mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-hat-3" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="Username"
                              type="text"
                              name="username"
                              onChange={this.handleChange}
                              value={username}
                              required
                            />
                          </InputGroup>
                        </FormGroup>
                        <FormGroup>
                          <InputGroup className="input-group-alternative mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-email-83" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="Email"
                              type="email"
                              name="email"
                              onChange={this.handleChange}
                              value={email}
                              required
                            />
                          </InputGroup>
                        </FormGroup>
                        <FormGroup>
                          <InputGroup className="input-group-alternative mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-lock-circle-open" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="
                              Password"
                              type="password"
                              name="password"
                              onChange={this.handleChange}
                              value={password}
                              required
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
                          <InputGroup className="input-group-alternative mb-3">
                            <Input
                              type="select"
                              name="selectedCountry"
                              id="selectedCountry"
                              value={selectedCountry}
                              onChange={this.handleChange}
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
                        {selectedCountry && !isLoaded ? (
                          this.loadCitiesForSelectedCountry() && (
                            <FormGroup>
                              <InputGroup className="input-group-alternative mb-3">
                                <Input
                                  type="select"
                                  name="selectedCity"
                                  id="selectedCity"
                                  value={selectedCity}
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
                          )
                        ) : (
                          <FormGroup>
                            <InputGroup className="input-group-alternative mb-3">
                              <Input
                                type="select"
                                name="selectedCity"
                                id="selectedCity"
                                value={selectedCity}
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
                          <InputGroup className="input-group-alternative mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-hat-3" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="Address"
                              type="text"
                              name="address"
                              onChange={this.handleChange}
                              value={address}
                              required
                            />
                          </InputGroup>
                        </FormGroup>

                        <div className="text-center">
                          <Button
                            className="mt-4"
                            color="primary"
                            type="submit"
                          >
                            Create account
                          </Button>
                        </div>
                      </Form>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Container>
          </section>
        </main>
        <SimpleFooter />
      </>
    );
  }
}

export default Register;
