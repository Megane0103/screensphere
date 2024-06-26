import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import _debounce from "lodash/debounce";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const searchResultsRef = useRef(null);


  const handleSearch = async () => {
    try {
      setSearching(true);
      const response = await axios.get(`http://127.0.0.1:8000/search?q=${searchInput}`);
      setSearchResults(response.data.results);
    } catch (error) {
      console.error("Error searching:", error);
    } finally {
      setSearching(false);
    }
  };

  const debouncedSearch = _debounce(handleSearch, 300);

  const handleLogOut = async () => {
    try {
      const { data: csrfToken } = await axios.get("http://127.0.0.1:8000/csrf-token");

      await logout(csrfToken);

      navigate("/");
    } catch (error) {
      console.log("Logout failed:", error);
    }
  };



  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchResultsRef.current && !searchResultsRef.current.contains(event.target)) {
        setSearchInput("");
        setSearchResults([]);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  const handleResultClick = () => {
    setSearchInput(''); 
    setSearchResults([]); 
  };
  return (
    <div className="flex items-center justify-between p-4 bg-gray-800 bg-opacity-60 z-50 text-white w-full fixed">
      <Link to="/">
        <h1 className="text-4xl font-bold cursor-pointer bg-gradient-to-r from-purple-500 to-green-300 text-transparent bg-clip-text">ScreenSphere</h1>
      </Link>
  
      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search movies..."
          value={searchInput}
          onChange={(e) => {
            setSearchInput(e.target.value);
            debouncedSearch();
          }}
          className="p-2 border border-gray-300 rounded-md mr-4 focus:outline-none bg-gray-700 text-white"
        />
  
        {/* Search Results */}
        {!searching && searchResults.length > 0 && (
          <div
            ref={searchResultsRef}
            className="absolute top-full left-0 mt-2 bg-black rounded-md border border-gray-300 w-[200px] max-h-[200px] overflow-y-auto shadow-md"
          >
            {searchResults.map((result) => (
              <Link
                to={`/movie/${result.id}`}
                key={result.id}
                className="flex items-center p-2 cursor-pointer hover:bg-gray-800 transition duration-300 ease-in-out"
                onClick={() => {
                  handleResultClick();
                }}
              >
                {result.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w200${result.poster_path}`}
                    alt={result.title}
                    className="w-10 h-14 mr-2 object-cover rounded-md"
                  />
                ) : (
                  <div className="w-10 h-14 bg-gray-300 mr-2 rounded-md"></div>
                )}
                <span className="text-white">{result.title}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
  
      {/* User Actions */}
      <div className="flex items-center space-x-4">
        {user ? (
          <>
            <Link to="/account">
              <button className="text-[#FFFDE3]">Account</button>
            </Link>
            {/* Add a link to the Settings component */}
            <Link to="/settings">
              <button className="text-[#FFFDE3]">Settings</button>
            </Link>
            <button
              onClick={handleLogOut}
              className="text-[#FFFDE3] px-4 py-2 rounded cursor-pointer bg-cyan-600"
            >
              Logout
            </button>
          </>
        ) : (
          <div className="flex items-center space-x-4">
            <Link to="/signIn">
              <button className="text-[#FFFDE3]">Sign In</button>
            </Link>
            <Link to="/signUp">
              <button className="text-[#FFFDE3] px-4 py-2 rounded cursor-pointer bg-cyan-600">
                Sign Up
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
        };  
export default Navbar;
