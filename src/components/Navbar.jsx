import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logOut } from "../auth/firebase";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();

  const { currentUser } = useContext(AuthContext);
  // const { currentUser } = useAuthContext;  // Custom hook ile gönderdiğimiz yöntem. Üstteki ile aynı.

  // const currentUser = { name: "muhsin" };
  // const currentUser = false;

  return (
    <nav className="navbar navbar-expand-lg py-4 bg-primary">
      <div className="container-fluid">
        <Link className="navbar-brand text-white ps-3 fs-5" to="/">
          React Movie App
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav ms-auto me-2">
            {currentUser ? (
              <>
                <h5 className="mt-2 text-capitalize fs-4 text-white">
                  {currentUser.displayName}
                </h5>
                <button
                  className="ms-3 btn btn-outline-light fs-5"
                  onClick={() => logOut()}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  className="ms-3 btn btn-outline-light fs-5"
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
                <button
                  className="ms-3 btn btn-outline-light fs-5"
                  onClick={() => navigate("/register")}
                >
                  Register
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
