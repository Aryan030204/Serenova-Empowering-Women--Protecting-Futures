import { useState } from "react";
import { Link } from "react-router";
import { Menu, X } from "lucide-react";
import logo from "../assets/logo.png";
import { useSelector } from "react-redux";
import Profile from "./Profile";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((store) => store.user.user);
  
  

  return (
    <div className="flex w-full h-[5rem] justify-between items-center px-6 bg-white sticky z-50">
      <Link to="/" className="flex items-center">
        <img
          src={logo}
          alt="serenova"
          className="w-[4rem] h-[4rem] border rounded-full"
        />
      </Link>

      {/* Hamburger Menu */}
      <button
        className="lg:hidden text-gray-700"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={30} /> : <Menu size={30} />}
      </button>

      <ul className="hidden lg:flex justify-center gap-10 items-center w-full">
        <Link to="/blog" className="font-handwriting text-2xl font-semibold">
          <li>Blog</li>
        </Link>
        <Link to="/contact" className="font-handwriting text-2xl font-semibold">
          <li>Contact us</li>
        </Link>
        <Link to="/help" className="font-handwriting text-2xl font-semibold">
          <li>Want help?</li>
        </Link>
        <Link
          to="/routeplanner"
          className="font-handwriting text-2xl font-semibold"
        >
          <li>Route Planner</li>
        </Link>
      </ul>
      {user !== null && isOpen === false ? (
        <Profile user={user} />
      ) : (
        <Link
          to="/login"
          className="font-handwriting text-2xl hidden lg:block font-semibold"
        >
          login
        </Link>
      )}

      {/* Mobile Dropdown */}
      {isOpen && (
        <ul className="lg:hidden absolute top-16 left-0 w-full bg-white border border-black border-t-1 border-b-0 shadow-lg flex flex-col items-center py-4 space-y-4">
          <Link
            to="/blog"
            className="text-2xl font-semibold font-handwriting"
            onClick={() => setIsOpen(false)}
          >
            <li>Blog</li>
          </Link>
          <Link
            to="/contact"
            className="text-2xl font-semibold font-handwriting"
            onClick={() => setIsOpen(false)}
          >
            <li>Contact us</li>
          </Link>
          <Link
            to="/help"
            className="text-2xl font-semibold font-handwriting"
            onClick={() => setIsOpen(false)}
          >
            <li>Want help?</li>
          </Link>
          <Link
            to="/routeplanner"
            className="text-2xl font-semibold font-handwriting"
            onClick={() => setIsOpen(false)}
          >
            <li>Route Planner</li>
          </Link>
          {user ? (
            <Profile user={user} />
          ) : (
            <Link
              to="/login"
              className="text-2xl font-semibold font-handwriting"
              onClick={() => setIsOpen(false)}
            >
              <li>login</li>
            </Link>
          )}
        </ul>
      )}
    </div>
  );
};

export default Header;
