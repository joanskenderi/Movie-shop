import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import noimage from "../assets/no-image.png";

const Product = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState();
  const [loading, setLoading] = useState(true);
  const [cartUpdated, setCartUpdated] = useState(false);

  const BASE_URL = "https://api.themoviedb.org/3";
  const API_KEY = "api_key=3e52e2f5350ae60de5e2fc58e818d2a0";
  const API_URL = `${BASE_URL}/movie/${id}?${API_KEY}`;

  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => {
        setMovie(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    let quantity = Array.from(e.target.elements)[0].value;

    if (quantity >= 1) {
      let cart_items =
        localStorage.getItem("cart") === null
          ? []
          : JSON.parse(localStorage.getItem("cart"));

      if (cart_items.length > 0) {
        let found = false;
        for (let i in cart_items) {
          if (cart_items[i].id === id) {
            found = true;
            cart_items[i].quantity =
              parseInt(cart_items[i].quantity) + parseInt(quantity);
          }
        }

        if (found) {
          localStorage.setItem("cart", JSON.stringify(cart_items));
        } else {
          localStorage.setItem(
            "cart",
            JSON.stringify([
              ...cart_items,
              { id: id, title: movie.title, quantity: quantity },
            ])
          );
        }
      } else {
        const item = {
          id: movie.id,
          title: movie.title,
          quantity: quantity,
        };

        localStorage.setItem("cart", JSON.stringify([item]));
      }

      setCartUpdated(true);
      Array.from(e.target.elements)[0].value = 0;
    }
  };

  return (
    <>
      <Header />
      <div className="view-product p-60">
        <div className="container-row">
          {loading
            ? "Loading..."
            : movie && (
                <>
                  <div className="product-image">
                    {movie.poster_path === null ? (
                      <img src={noimage} alt={movie.original_title} />
                    ) : (
                      <img
                        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                        alt={movie.original_title}
                      />
                    )}
                  </div>
                  <div className="product-details">
                    <h2>{movie.title}</h2>
                    <p>{movie.overview}</p>
                    <table>
                      <tbody>
                        <tr>
                          <td>Release data</td>
                          <td>{movie.release_date}</td>
                        </tr>
                        <tr>
                          <td>Spoken languages</td>
                          <td>
                            {movie.spoken_languages &&
                              movie.spoken_languages.map((lang) => (
                                <span className="badge" key={lang.iso_639_1}>
                                  {lang.english_name}
                                </span>
                              ))}
                          </td>
                        </tr>
                        <tr>
                          <td>Genres</td>
                          <td>{movie.release_date}</td>
                        </tr>
                      </tbody>
                    </table>
                    <br />
                    <h4>Price: {(movie.id / 10000).toFixed(2)} &euro;</h4>
                    <form className="add-to-cart" onSubmit={handleSubmit}>
                      <input type="number" name="quantity" min="0" max="10" />
                      <input type="hidden" name="id" value={movie.id} />
                      <button type="submit">Add to cart</button>
                    </form>
                    {cartUpdated ? <p>Product was added to cart</p> : ""}
                  </div>
                </>
              )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Product;
