import React from "react";
import Header from "./Header";
import Forms from "./Forms";
import { background } from "../utils/constants";

const Login = () => {
  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          className="h-screen w-screen object-cover"
          alt="background"
          src={background}
        />
      </div>
      <Forms />
    </div>
  );
};

export default Login;
