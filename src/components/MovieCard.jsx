import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { toastWarnNotify } from "../helpers/ToastNotify";

const defaultImage =
  "https://images.unsplash.com/photo-1581905764498-f1b60bae941a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80";

const MovieCard = ({ item }) => {
  const { id, title, poster_path, vote_average, overview } = item;
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  return (
    <div
      className="card"
      style={{ width: "18rem", cursor: "pointer" }}
      onClick={() => {
        navigate(`/movies/${id}`);
        !currentUser && toastWarnNotify("Please log in to see detail");
      }}
      onMouseOver={() => setShow(true)}
      onMouseOut={() => setShow(false)}
    >
      <img
        className="card-img-top"
        src={
          poster_path
            ? `https://image.tmdb.org/t/p/original/${poster_path}`
            : defaultImage
        }
        alt={title}
        style={{ height: "26.5rem" }}
      />
      <div className="card-over">{show ? overview : null}</div>
      <div
        className="card-body d-flex justify-content-between align-items-center bg-primary text-white"
        style={{ height: "4rem" }}
      >
        <p>{title}</p>
        {<p>{currentUser && vote_average}</p>}
      </div>
    </div>
  );
};

export default MovieCard;
