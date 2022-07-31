import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import NotFoundPage from "./NotFoundPage";
// import { useLocation } from 'react-router-dom';

const MovieDetail = () => {
  //! Linkteki parametreyi almak icin useParams Hook'u kullanilabilir.
  const { id } = useParams();
  const API_KEY = process.env.REACT_APP_TMDB_KEY;

  const navigate = useNavigate();
  //! navigate ile gonderilen state(veriyi) yakalamak icin ise
  //! useLocation Hook'u kullanilabilir.
  // const location = useLocation();
  // const inst = location.state;

  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`)
      .then((res) => {
        if (!res.ok) {
          setError(true); // Kullanıcıya hatayı gösterebilmek için bunu yaptık.
          throw new Error("Something went wrong");
        }
        return res.json();
      })
      .then((data) => setMovie(data)) // State güncellendiğinde yeniden render olur ve aşağıdaki if'e tekrar girer.
      .catch((err) => console.log(err));
  }, [id]);

  console.log(movie);

  if (error) {
    return <NotFoundPage />;
  } else if (!movie) {
    return (
      <div className="text-center">
        <h2>Data is Fetching</h2>
      </div>
    );
  } else {
    return (
      <div>
        <h1 className="text-center display-4 pt-4 text-danger">
          {movie.original_title}
        </h1>
        <div className="container text-start d-flex mt-4 w-50 ">
          <img
            className="w-50"
            src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
            alt=""
          />
          <div className="ms-4">
            <h3>Overview</h3>
            <p>{movie.overview}</p>
            <p className="mt-5">
              <b>Release-date : </b>
              {movie.release_date}
            </p>
            <p>
              <b>Rate : </b>
              {movie.vote_average}
            </p>
            <p>
              <b>Total Votes : </b>
              {movie.vote_count}
            </p>
            <button onClick={() => navigate(-1)} className="btn btn-warning">
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default MovieDetail;
