// src/components/Navbar.jsx
import { Link } from "react-router-dom";
import React from 'react';
import "./Navbar.css"

export default function Navbar() {
  return (
    <nav className="navbar">
      <a className="navbar-logo">The Money Bowl</a>
      <ul className="navbar-links">
        <li><Link to ="/">Home</Link></li>
        <li><Link to ="#features">Features</Link></li>
        <li><Link to ="#about">About</Link></li>
        <li><Link to ="#contact">Contact</Link></li>
      </ul>
      <button className="navbar-button">Sign Up</button>
    </nav>
  );
}
