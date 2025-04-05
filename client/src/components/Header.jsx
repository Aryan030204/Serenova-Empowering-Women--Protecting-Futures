import { useState } from "react";
import { Link } from "react-router";
import { Menu, X } from "lucide-react";
import logo from "../assets/logo.png";
import { useSelector } from "react-redux";
import Profile from "./Profile";

const navLinks = [
  { path: "/blog", label: "Blog" },
  { path: "/contact", label: "Contact us" },
  { path: "/help", label: "Want help?" },
  { path: "/routeplanner", label: "Route Planner" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((store) => store.user.user);

  return (
    <header className="w-full h-[5rem] bg-white px-6 flex justify-between items-center sticky top-0 z-50 shadow-sm">
      {/* Logo */}
      <Link to="/" className="flex items-center">
        <img
          src={logo}
          alt="serenova"
          className="w-[4rem] h-[4rem] border rounded-full"
        />
      </Link>

      {/* Hamburger Icon (Mobile) */}
      <button
        className="lg:hidden text-gray-700"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={30} /> : <Menu size={30} />}
      </button>

      {/* Desktop Nav */}
      <nav className="hidden lg:flex items-center gap-10">
        {navLinks.map((link) => (
          <li key={link.path} className="list-none">
            <Link
              to={link.path}
              className="font-handwriting text-2xl font-semibold hover:text-purple-600"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </nav>

      {/* Auth/Profile (Desktop) */}
      <div className="hidden lg:block">
        {user ? (
          <Profile user={user} />
        ) : (
          <Link
            to="/login"
            className="font-handwriting text-2xl font-semibold"
          >
            login
          </Link>
        )}
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <ul className="lg:hidden absolute top-16 left-0 w-full bg-white shadow-lg border-t border-gray-200 flex flex-col items-center py-4 space-y-4 z-50">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className="text-2xl font-handwriting font-semibold"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}

          {user ? (
            <Profile user={user} />
          ) : (
            <li>
              <Link
                to="/login"
                className="text-2xl font-handwriting font-semibold"
                onClick={() => setIsOpen(false)}
              >
                login
              </Link>
            </li>
          )}
        </ul>
      )}
    </header>
  );
};

export default Header;
