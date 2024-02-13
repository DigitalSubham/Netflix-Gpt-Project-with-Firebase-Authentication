import React from "react";
import Logo from "../assets/StreamSage.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <div className="flex justify-between absolute z-50">
        <Link to={"/"}>
          <img
            className="w-44 hidden md:block md:mx-0"
            src={Logo}
            alt="netflix-logo"
          />
        </Link>
      </div>
    </>
  );
};

export default Navbar;
