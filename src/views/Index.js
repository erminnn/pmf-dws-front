import React from "react";
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";
import Hero from "./examples/Hero.js";

class Index extends React.Component {
  render() {
    return (
      <>
        <DemoNavbar />
        <Hero></Hero>
        <SimpleFooter />
      </>
    );
  }
}

export default Index;
