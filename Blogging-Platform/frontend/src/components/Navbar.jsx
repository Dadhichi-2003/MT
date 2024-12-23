import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { IoMdMenu } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <nav className="bg-white fixed w-full z-20 top-0 start-0 border-b border-gray-200 ">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img src={logo} className="h-10" alt="Flowbite Logo" />
        </Link>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {isAuthenticated ? (
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-4 py-2 text-center"
              onClick={logout}
            >
              Logout
            </button>
          ) : (
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-4 py-2 text-center"
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </button>
          )}

          <button
            type="button"
            className="inline-flex items-center w-10 h-10 p-1 justify-center  text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            onClick={() => {
              setToggleMenu(!toggleMenu);
            }}
          >
            {toggleMenu ? (
              <IoClose className="w-full h-full" />
            ) : (
              <IoMdMenu className="w-full h-full" />
            )}
          </button>
        </div>
        <div
          className={`items-center justify-between  w-full md:flex md:w-auto md:order-1 ${
            toggleMenu ? " absolute top-14 left-0" : "hidden"
          }`}
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white ">
            <li>
              <NavLink
                to="/"
                className="block text-lg py-2 px-3 rounded md:p-0"
                aria-current="page"
                onClick={() => setToggleMenu(false)}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/profile"
                className="block text-lg py-2 px-3 rounded md:p-0"
                aria-current="page"
                onClick={() => setToggleMenu(false)}
              >
                Profile
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
