
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';

export default function Navbar() {
    const navigate = useNavigate();
    const { token, setToken } = useContext(AuthContext);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setToken(null);
        navigate('/login');
    };

    return (
    <nav className="w-full px-8 py-2 bg-offWhite shadow flex flex-row items-center justify-between">
      <Link to="/">
        <img
          src="/full-logo-nobg.png"
          alt="Stratify Logo"
          className="h-14 w-auto mr-12 block object-contain cursor-pointer"
          style={{ maxWidth: "180px" }}
        />
      </Link>

      {token ? (
        // LOGGED-IN UI
        <div className ="flex flex-row gap-8 adlam-display-regular text-2xl text-navyblue items-center">
          <Link to="/dashboard" className="hover:text-calmblue transition duration-300">Dashboard</Link>
          <Link to="/portfolios" className="hover:text-calmblue transition duration-300">Portfolios</Link>
          <Link to="/market" className="hover:text-calmblue transition duration-300">Market</Link>
          <Link to="/trade" className="hover:text-calmblue transition duration-300">Trade</Link>
          <Link to="/profile" className="hover:text-calmblue transition duration-300">Profile</Link>
          <button
            onClick={handleLogout}
            className="ml-4 px-4 py-1 rounded bg-calmblue text-white hover:bg-navyblue transition duration-300"
          >
            Log Out
          </button>
        </div>
      ) : (
        // LOGGED-OUT UI
        <div className ="flex flex-row gap-8 adlam-display-regular text-2xl text-navyblue items-center">
          <Link to="/about"      className="hover:text-calmblue transition duration-300">About</Link>
          <Link to="/features"   className="hover:text-calmblue transition duration-300">Features</Link>
          <Link to="/markets"    className="hover:text-calmblue transition duration-300">Live Markets</Link>
          <Link to="/learn"      className="hover:text-calmblue transition duration-300">Learn</Link>
          <Link to="/register"   className="hover:text-calmblue transition duration-300">Register</Link>
          <Link to="/login"      className="hover:text-calmblue transition duration-300">Login</Link>
        </div>
      )}
    </nav>
  );
}