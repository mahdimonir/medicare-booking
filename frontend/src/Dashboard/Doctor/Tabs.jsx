import { useContext, useEffect, useRef, useState } from "react";
import { BiMenu } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { authContext } from "../../context/AuthContext";

function Tabs({ tab, setTab }) {
  const { dispatch } = useContext(authContext);
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to track menu visibility

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
    setIsMenuOpen(false); // Close the menu after logout
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev); // Toggle menu state
  };

  const handleMenuButtonClick = (tabName) => {
    setTab(tabName); // Set the active tab
    setIsMenuOpen(false); // Close the menu
  };

  // Close the menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false); // Close the menu
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      {/* Mobile Menu Toggle Button */}
      <span className="md:hidden" onClick={toggleMenu}>
        <BiMenu className="w-6 h-6 cursor-pointer" />
      </span>

      {/* Sidebar Menu */}
      <div
        className={`${
          isMenuOpen ? "block" : "hidden"
        } md:flex flex-col p-[30px] bg-white shadow-2xl shadow-panelShadow items-center h-max rounded-md`}
        ref={menuRef}
      >
        <button
          onClick={() => handleMenuButtonClick("overview")}
          className={`${
            tab === "overview"
              ? "bg-indigo-100 text-primaryColor"
              : "bg-transparent text-headingColor"
          } w-full btn mt-0 rounded-md`}
        >
          Overview
        </button>
        <button
          onClick={() => handleMenuButtonClick("appointments")}
          className={`${
            tab === "appointments"
              ? "bg-indigo-100 text-primaryColor"
              : "bg-transparent text-headingColor"
          } w-full btn mt-0 rounded-md`}
        >
          Appointments
        </button>
        <button
          onClick={() => handleMenuButtonClick("settings")}
          className={`${
            tab === "settings"
              ? "bg-indigo-100 text-primaryColor"
              : "bg-transparent text-headingColor"
          } w-full btn mt-0 rounded-md`}
        >
          Profile
        </button>
        <div className="mt-[100px] w-full">
          <button
            onClick={handleLogout}
            className="w-full bg-[#181A1E] p-3 text-[16px] leading-7 rounded-md text-white"
          >
            Logout
          </button>
          <button
            onClick={() => setIsMenuOpen(false)} // Close the menu on delete account
            className="w-full bg-red-600 mt-4 p-3 text-[16px] leading-7 rounded-md text-white"
          >
            Delete account
          </button>
        </div>
      </div>
    </div>
  );
}

export default Tabs;
