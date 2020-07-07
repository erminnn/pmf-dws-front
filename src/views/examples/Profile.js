import React from "react";
import axios from "axios";
import moment from "moment";
import ReactDatetime from "react-datetime";
// reactstrap components
import {
  Button,
  Card,
  Container,
  Row,
  Col,
  Modal,
  FormGroup,
  Label,
  Input,
  Form,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  CardBody,
  CustomInput,
} from "reactstrap";

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
    const response = await axios.get(
      "http://127.0.0.1:8080/user/findByUsername/" + username,
      config
    );
    const {
      firstName,
      lastName,
      profileImage,
      country,
      city,
      dateOfBirth,
      email,
      id,
    } = response.data;

    localStorage.setItem("user_id", id);

    const serviceTypes = await axios.get(
      "http://localhost:8080/service-type/all",
      config
    );

    const age = this.getAge(dateOfBirth);
    this.setState({
      ...this.state,
      profileImage: profileImage,
      firstName: firstName,
      lastName: lastName,
      age: age,
      country: country.name,
      city: city.name,
      email: email,
      serviceTypesFromDatabase: serviceTypes.data,
    });
  }

  getAge = (dateOfBirth) => {
    let startDate = new Date(dateOfBirth);
    let endDate = new Date();

    const age = moment.duration(endDate - startDate).years();
    return age;
  };

  state = {
    profileImage: null,
    modalEditProfilePicture: false,
    modalOfferService: false,
    selectedProfileImage: null,
    age: 0,
    firstName: "",
    lastName: "",
    country: "",
    city: "",
    email: "",
    serviceTypesFromDatabase: [],
    serviceType: 0,
    serviceDescription: "",
    serviceFromDate: "",
    serviceToDate: "",
    serviceMaxPerson: "",
  };

  toggleModal = (event) => {
    let modalName = event.target.name;

    this.setState({
      [event.target.name]: !this.state[modalName],
    });
  };

  fileSelectedHandler = (event) => {
    this.setState({
      ...this.state,
      selectedProfileImage: event.target.files[0],
    });
  };

  handleChangeServiceDateFrom = (date) => {
    console.log(this.state);

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

  uploadProfileImage = async () => {
    const fd = new FormData();
    fd.append("file", this.state.selectedProfileImage);
    const token = "Bearer " + localStorage.getItem("token");
    const username = localStorage.getItem("username");
    const config = {
      headers: {
        authorization: `${token}`,
      },
    };
    let editImagePost = await axios.post(
      "http://127.0.0.1:8080/user/profile/" + username + "/edit-profile-image",
      fd,
      config
    );
    this.setState({ ...this.state, modalIsOpen: !this.state.modalIsOpen });
    window.location.reload();
  };

  saveOfferedService = async () => {
    const {
      serviceType,
      serviceDescription,
      serviceMaxPerson,
      serviceFromDate,
      serviceToDate,
      modalOfferService,
    } = this.state;

    const serviceDateFrom = serviceFromDate.valueOf();
    const serviceDateTo = serviceToDate.valueOf();
    const user = localStorage.getItem("user_id");
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
    };
    const token = "Bearer " + localStorage.getItem("token");
    const config = {
      headers: {
        authorization: `${token}`,
      },
    };
    let response = await axios.post(
      "http://localhost:8080/user-offer-service-type/add",
      service,
      config
    );
    console.log(response);

    this.setState({
      ...this.state,
      modalOfferService: !this.state.modalOfferService,
      serviceType: 0,
      serviceDescription: "",
      serviceFromDate: "",
      serviceToDate: "",
      serviceMaxPerson: "",
    });
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
      serviceDescription,
      serviceFromDate,
      serviceMaxPerson,
      serviceType,
      serviceToDate,
      serviceTypesFromDatabase,
    } = this.state;
    return (
      <>
        <Modal
          className="modal-dialog-centered"
          isOpen={this.state.modalEditProfilePicture}
        >
          <div className="modal-header">
            <h6 className="modal-title" id="modal-title-default">
              Add new profile image
            </h6>
            <button
              aria-label="Close"
              className="close"
              name="modalEditProfilePicture"
              data-dismiss="modal"
              type="button"
              onClick={this.toggleModal}
            >
              ×
            </button>
          </div>
          <div className="modal-body">
            <FormGroup>
              <Label for="exampleFile">File</Label>

              <CustomInput
                type="file"
                id="exampleFile"
                name="file"
                onChange={this.fileSelectedHandler}
              />
            </FormGroup>
          </div>
          <div className="modal-footer">
            <Button
              color="primary"
              type="button"
              onClick={this.uploadProfileImage}
            >
              Save changes
            </Button>
            <Button
              className="ml-auto"
              color="link"
              data-dismiss="modal"
              type="button"
              name="modalEditProfilePicture"
              onClick={this.toggleModal}
            >
              Close
            </Button>
          </div>
        </Modal>

        <Modal
          className="modal-dialog-centered"
          size="sm"
          isOpen={this.state.modalOfferService}
        >
          <div className="modal-header">
            <h5 className="modal-title" id="modal-title-default">
              Offer service
            </h5>
            <button
              aria-label="Close"
              className="close"
              name="modalOfferService"
              data-dismiss="modal"
              type="button"
              onClick={this.toggleModal}
            >
              ×
            </button>
          </div>
          <div className="modal-body p-0">
            <Card className="bg-secondary shadow border-0">
              <CardBody className="px-lg-5 py-lg-5">
                <Form role="form">
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
                        placeholder="Max persons for service"
                        type="text"
                        value={serviceMaxPerson}
                        onChange={this.handleChange}
                        name="serviceMaxPerson"
                      />
                    </InputGroup>
                  </FormGroup>
                </Form>
              </CardBody>
            </Card>
            <div className="modal-footer">
              <Button
                color="primary"
                type="button"
                onClick={this.saveOfferedService}
              >
                Offer
              </Button>
              <Button
                className="ml-auto"
                color="link"
                data-dismiss="modal"
                type="button"
                name="modalOfferService"
                onClick={this.toggleModal}
              >
                Close
              </Button>
            </div>
          </div>
        </Modal>

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
                            className="rounded-circle"
                            src={"data:image/png;base64," + profileImage}
                          />
                        </a>
                      </div>
                    </Col>
                    <Col
                      className="order-lg-3 text-lg-right align-self-lg-center"
                      lg="4"
                    >
                      <div className="card-profile-actions py-4 mt-lg-0">
                        <Button
                          className="mr-4"
                          color="info"
                          name="modalEditProfilePicture"
                          onClick={this.toggleModal}
                          size="sm"
                        >
                          Add new image
                        </Button>

                        <Button
                          className="float-right"
                          color="default"
                          name="modalOfferService"
                          onClick={this.toggleModal}
                          size="sm"
                        >
                          Offer a service
                        </Button>
                      </div>
                    </Col>
                    <Col className="order-lg-1" lg="4">
                      <div className="card-profile-stats d-flex justify-content-center">
                        <div>
                          <span className="heading">22</span>
                          <span className="description">Friends</span>
                        </div>
                        <div>
                          <span className="heading">10</span>
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
                      <Col lg="9">
                        <p>
                          An artist of considerable range, Ryan — the name taken
                          by Melbourne-raised, Brooklyn-based Nick Murphy —
                          writes, performs and records all of his own music,
                          giving it a warm, intimate feel with a solid groove
                          structure. An artist of considerable range.
                        </p>
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
