import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

import logo from "../assets/logo.png";

export const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]) || "";
  const navigate = useNavigate();

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.clear();
    navigate("/auth");
  };
  return (
    <div className="navbar">
      <div>
        <img src={logo} alt="logo.png" className="logo m-0 mr-150" />
      </div>
      <Link to="/">Home</Link>
      <Link to="/create-recipe">Create Recipe</Link>
      <Link to="/saved-recipes">Saved Recipes</Link>
      {!cookies.access_token ? (
        <Link to="/auth">
          <div className="custom-btn ml-150">Login/Register</div>
        </Link>
      ) : (
        <button onClick={logout} className="custom-btn red ml-150">
          Logout
        </button>
      )}
    </div>
  );
};
