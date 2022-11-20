import Header from "../components/Header";
import Slider from "../components/Slider";
import LatestProducts from "../components/LatestProducts";
import About from "../components/About";
import Footer from "../components/Footer";
import axios from "axios";
import { useState, useEffect } from "react";

const Home = () => {
  const [movies, setMovies] = useState([]);

  const API_KEY = "api_key=3e52e2f5350ae60de5e2fc58e818d2a0";
  const BASE_URL = "https://api.themoviedb.org/3";
  const API_URL = `${BASE_URL}/discover/movie/?certification_country=US&certification=R&sort_by=vote_average.desc&${API_KEY}`;

  useEffect(() => {
    axios
      .get(API_URL)
      .then((resp) => setMovies(resp.data.results.splice(1, 4)))
      // ishte (0, 4), por itemit te pare nuk i vinte fotoja nga API
      .catch((e) => console.log(e));
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
