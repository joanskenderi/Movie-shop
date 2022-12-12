import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import Slider from "../components/Slider";
import LatestProducts from "../components/LatestProducts";
import About from "../components/About";
import Footer from "../components/Footer";

const Home = () => {
  const [movies, setMovies] = useState([]);

  const BASE_URL = "https://api.themoviedb.org/3";
  const API_KEY = "api_key=3e52e2f5350ae60de5e2fc58e818d2a0";
  const API_URL = `${BASE_URL}/discover/movie/?certification_country=US&certification=R&sort_by=vote_average.desc&${API_KEY}`;

  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => setMovies(res.data.results.splice(0, 4)))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Header />
      <Slider />
      <LatestProducts movies={movies} />
      <About />
      <Footer />
    </>
  );
};

export default Home;
