import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { useState } from "react";
import LightModeIcon from "@mui/icons-material/LightMode";
import NightsStayIcon from '@mui/icons-material/NightsStay';

export default function Navbar() {
  let body = document.querySelector("#root");
  const [darkmode, setDarkmode] = useState(false);

  if (localStorage.getItem("dark") && !darkmode) {
    body.classList.remove("light");
    body.classList.add("dark");
    setDarkmode(true);
  }

  function switchTheme() {
    body.classList.toggle("light");
    body.classList.toggle("dark");
    if (body.classList.contains("dark")) {
      localStorage.setItem("dark", "true");
      setDarkmode(true);
    } else {
      localStorage.removeItem("dark");
      setDarkmode(false);
    }
  }

  return (
    <nav className="nav">
      <Link to="/" className="site-title">
        <h1>Daily Dose</h1>
      </Link>
      <ul>
        <li className="theme-container">
          {/* <label>Dark mode</label>
          <Switch checked={darkmode} onChange={switchTheme} /> */}
          <div className="theme-btn-container">
            {darkmode ? (
              <LightModeIcon className="theme-btn" onClick={switchTheme} />
            ) : (
              <NightsStayIcon className="theme-btn" onClick={switchTheme} />
            )}
          </div>
        </li>
        {/* <button onClick={switchTheme}>Switch theme</button> */}
        <CustomLink to="/Create">Create</CustomLink>
        <CustomLink to="/about">About</CustomLink>
        <CustomLink to="/contact">Contact</CustomLink>
      </ul>
    </nav>
  );
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}
