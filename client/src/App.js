import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Login from "./components/login";
import BlogPost from "./components/Posts";
import Register from "./components/register"; 
import About from "./components/about"; 
import Blog from './components/blog';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul className="nav">
            
            <li className="nav-item bg-white">
              <Link to="/blogpost" className="nav-link">
                Create a Post
              </Link>
            </li>
            <li className="nav-item ">
              <Link to="/blog" className="nav-link">
                Posts
              </Link>
            </li>
            <li className="nav-item bg-white">
              <Link to="/" className="nav-link">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/register" className="nav-link">
                Register
              </Link>
            </li>
            <li className="nav-item bg-white">
              <Link to="/about" className="nav-link">
                About
              </Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/blogpost" element={<BlogPost />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
