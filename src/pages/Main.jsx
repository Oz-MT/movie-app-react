import React, { useContext } from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import { AuthContext } from "../context/AuthContext";
import { toastErrorNotify } from "../helpers/ToastNotify";
const API_KEY = process.env.REACT_APP_TMDB_KEY;

const Main = () => {
  const [discover, setDiscover] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const { currentUser } = useContext(AuthContext);

  const url1 = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`;
  const url2 = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${search}`;
  // const url3 = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`

  const getData = async (API) => {
    setLoading(true);
    try {
      const { data } = await axios.get(API);
      // console.log(data.results);
      setDiscover(data.results);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search && currentUser) {
      getData(url2);
    } else if (!currentUser) {
      toastErrorNotify("Please log in to search a movie");
    } else {
      toastErrorNotify("Please enter a text");
    }
    setSearch("");
  };

  useEffect(() => {
    getData(url1);
  }, []);

  return (
    <main>
      <form
        className="d-flex justify-content-center my-5"
        role="search"
        onSubmit={handleSubmit}
      >
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          style={{ width: "15rem" }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="btn btn-outline-success" type="submit">
          Search
        </button>
      </form>
      <div className="container-fluid d-flex flex-wrap justify-content-center gap-5">
        {loading ? (
          <div className="text-primary m-5 display-2">
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          discover?.map((item) => {
            const { id } = item;
            return <MovieCard item={item} key={id} />;
          })
        )}
      </div>
    </main>
  );
};

export default Main;
