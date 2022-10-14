import React from "react";
import Header from "../components/Header";
import Slider from "../components/Slider";
import LatestProducts from "../components/LatestProducts";
import About from "../components/About";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <Header />
      <Slider />
      <LatestProducts />
      <About />
      <Footer />
    </>
  );
}

export default Home;
