import React, { useState } from "react";
import { NavLink } from "react-router";
import { IoMenuSharp } from "react-icons/io5";
import { IoClose } from "react-icons/io5";

const navlinks = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "about-us" },
  { name: "Privacy Policy", path: "privacy-policy" },
  { name: "Contact US", path: "contact-us" },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  return (
    <header className="bg-white py-6 border-b-1 border-b-slate-200">
      <nav className="container mx-auto flex justify-between px-5">
        <a href="/">
          <img className="h-12" src="/vite.svg" alt="" />
        </a>
        <ul className="sm:flex hidden items-center gap-8">
          {navlinks.map((link, index) => (
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? "active" : "")}
                to={`${link.path}`}
              >
                {link.name}
              </NavLink>
            </li>
          ))}
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
        </ul>

        {/* toggle menu */}
        <div className="flex items-center sm:hidden">
          <button
            className="flex items-center px-3 py-4 bg-[#fafafa ] rounded text-sm text-gray-500 hover:text-gray-900 cursor-pointer"
            onClick={toggleMenu}
          >
            {isMenuOpen ? (
              <IoClose className="h-6 w-6" />
            ) : (
              <IoMenuSharp className="h-6 w-6" />
            )}
          </button>
        </div>
      </nav>

      {/* mobile menu items */}
      {isMenuOpen && (
        <ul className="sm:hidden fixed top-[108px] left-0 w-full h-auto pb-8 border-b bg-white shadow-sm z-50">
          {navlinks.map((link, index) => (
            <li className="mt-5 px-4">
              <NavLink
                className={({ isActive }) => (isActive ? "active" : "")}
                to={`${link.path}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </NavLink>
            </li>
          ))}
          <li className="mt-5 px-4">
            <NavLink to="/login">Login</NavLink>
          </li>
        </ul>
      )}
    </header>
  );
};

export default Navbar;
