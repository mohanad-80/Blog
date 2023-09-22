import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { useState } from "react";
import LightModeIcon from "@mui/icons-material/LightMode";
import NightsStayIcon from "@mui/icons-material/NightsStay";

export default function Navbar() {
  let body = document.querySelector("#root");
  const [darkmode, setDarkmode] = useState(false);

  if (localStorage.getItem("dark") && !darkmode) {
    body.classList.remove("light");
    body.classList.add("dark");
    setDarkmode(true);
  }

  // window.addEventListener("scroll", scrollFunction);

  // function scrollFunction() {
  //   if (
  //     document.body.scrollTop > 20 ||
  //     document.documentElement.scrollTop > 20
  //   ) {
  //     document.querySelector(".nav").style.top = "0";
  //   } else {
  //     document.querySelector(".nav").style.top = "-90px";
  //   }
  // }

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
        {/* ##### the logo ##### */}
        <svg
          version="1.0"
          xmlns="http://www.w3.org/2000/svg"
          height="60"
          width="60"
          viewBox="0 0 500.000000 500.000000"
          preserveAspectRatio="xMidYMid meet"
        >
          <g
            transform="translate(0.000000,500.000000) scale(0.100000,-0.100000)"
            fill={darkmode ? "#fff" : "#000"}
            stroke="none"
          >
            <path
              d="M2235 4049 c-155 -26 -361 -111 -515 -214 -173 -115 -378 -350 -443
-507 -18 -44 -7 -50 18 -12 32 49 96 68 230 68 115 1 122 0 173 -28 57 -32
132 -117 171 -193 64 -127 96 -357 88 -637 -6 -247 -37 -361 -123 -456 -55
-61 -108 -81 -228 -87 l-103 -6 -16 40 c-66 167 -105 533 -87 820 11 177 40
364 69 450 11 32 17 60 15 62 -9 10 -131 -58 -176 -98 -67 -59 -86 -96 -110
-213 -19 -90 -22 -135 -22 -358 0 -290 12 -387 69 -556 49 -149 116 -274 212
-402 247 -328 522 -485 908 -522 329 -30 670 78 922 294 60 51 123 111 142
134 33 42 33 42 101 42 92 0 113 10 139 64 36 79 32 86 -49 86 l-69 0 35 59
c36 61 78 162 119 290 83 256 89 660 14 916 -73 252 -176 424 -363 611 -102
101 -141 132 -243 193 -133 80 -268 135 -381 157 -82 15 -411 18 -497 3z m490
-188 c293 -66 594 -337 727 -654 115 -275 140 -617 68 -925 -32 -134 -94 -286
-155 -377 l-55 -84 -398 -3 -397 -3 -50 -26 c-61 -32 -94 -86 -76 -125 14 -33
46 -31 101 6 24 16 69 35 100 41 67 14 216 7 319 -15 41 -9 123 -17 183 -19
59 -1 108 -4 108 -7 0 -9 -79 -72 -145 -117 -118 -79 -247 -135 -364 -157
-237 -45 -425 -24 -627 69 -172 80 -262 150 -391 305 l-54 65 98 6 c163 10
229 36 321 127 70 68 121 166 154 297 20 82 22 113 23 355 0 419 -36 566 -183
739 -82 97 -188 151 -327 169 l-60 7 83 71 c160 136 344 226 527 258 55 10
107 19 115 21 41 10 274 -6 355 -24z"
            />
            <path
              d="M2477 3466 c-19 -20 -21 -39 -7 -67 8 -14 21 -19 55 -19 l45 0 -2
-687 -3 -688 -40 -3 c-49 -4 -65 -17 -65 -51 0 -48 11 -51 206 -51 193 0 247
6 335 39 84 32 133 80 179 174 100 208 126 674 56 987 -36 156 -87 244 -179
305 -77 51 -141 63 -365 71 -179 6 -199 5 -215 -10z m371 -98 c64 -19 119
-131 149 -306 25 -143 25 -704 0 -812 -22 -96 -70 -193 -108 -221 -37 -26
-131 -41 -113 -18 6 8 15 28 19 44 4 17 7 302 6 634 -2 687 4 641 -83 641 -52
0 -59 9 -29 39 15 15 29 17 72 14 30 -3 69 -9 87 -15z"
            />
          </g>
        </svg>
        {/* #################### */}
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
