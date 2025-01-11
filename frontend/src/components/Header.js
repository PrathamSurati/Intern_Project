import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../utils";

const Header = () => {
  const [loggedInUser, setLoggedInUser] = useState("");
  const [products, setProducts] = useState("");
  const [isProfileVisible, setIsProfileVisible] = useState(false); // New state for toggling profile visibility
  const navigate = useNavigate();

  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser"));
  }, []);

  const handleLogout = (e) => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    handleSuccess("User Loggedout");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  const fetchProducts = async () => {
    try {
      const url = "http://localhost:3001/products";
      const headers = {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      };
      const response = await fetch(url, headers);
      const result = await response.json();
      console.log(result);
      setProducts(result);
    } catch (err) {
      handleError(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const toggleProfileVisibility = () => {
    setIsProfileVisible((prevState) => !prevState); // Toggle the visibility
  };
  return (
    <div className="home-page">
      <nav>
        <div className="navbar">
          <div className="leftelement">
            <div className="left element1">Logo</div>
            <div className="left element2"><Link to="/appointment">Appointment</Link></div>
            <div className="left element3">Consultations</div>
            <div className="left element4">Option</div>
            <div className="left element5">Online detailing</div>
          </div>
          <div className="rightelement">
            <div className="rightelement1 right">
              <img
                src="https://cdn-icons-png.flaticon.com/128/8861/8861125.png"
                alt="add patient logo"
                width="20"
                height="20"
              />
            </div>
            <div className="rightelement2 right">
              <form class="form">
                <button>
                  <svg
                    width="17"
                    height="16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    role="img"
                    aria-labelledby="search"
                  >
                    <path
                      d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9"
                      stroke="currentColor"
                      stroke-width="1.333"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                  </svg>
                </button>
                <input
                  class="input"
                  placeholder="Type your text"
                  required=""
                  type="text"
                />
                <button class="reset" type="reset">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </button>
              </form>
            </div>
            <div className="rightelement3 right">
              <img
                src="https://cdn-icons-png.flaticon.com/128/18472/18472635.png"
                alt="menu"
                width="20"
                height="20"
              />
            </div>
            <div
              className="rightelement4 right"
              onClick={toggleProfileVisibility}
            >
              <img
                src="https://cdn-icons-png.flaticon.com/128/456/456283.png"
                alt="user logo"
                width="20"
                height="20"
                className="userData"
              />
              {isProfileVisible && (
                <div className="profile">
                  <h1>Welcome, Dr. {loggedInUser.trim().toUpperCase()}</h1>
                  <button onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
