import React, { useState } from "react";

import { Login } from "../components/login";
import { Register } from "../components/register";

export const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  const handleToRegister = () => {
    setIsLogin(false);
  };

  const handleToLogin = () => {
    setIsLogin(true);
  };

  return (
    <div className="auth">
      {isLogin ? (
        <div className="d-flex justify-content-end align-items-center w-100 mb-20">
          <span className="mr-10">Haven't Account: </span>
          <button onClick={handleToRegister} className="custom-btn">
            Register
          </button>
        </div>
      ) : (
        <div className="d-flex justify-content-end align-items-center w-100 mb-20">
          <span className="mr-10">Already Have Account: </span>
          <button onClick={handleToLogin} className="custom-btn">
            Login
          </button>
        </div>
      )}

      {isLogin ? <Login /> : <Register />}
    </div>
  );
};
