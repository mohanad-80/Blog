import { Link, useMatch, useResolvedPath } from "react-router-dom";
import CreateRoundedIcon from "@mui/icons-material/CreateRounded";

export default function Navbar() {
  return (
    <nav className="nav">
      <Link to="/" className="site-title">
        <h1>Blog</h1>
      </Link>
      <ul>
        <CustomLink to="/Create">
          <CreateRoundedIcon sx={{ height: 20 }} />
          Create
        </CustomLink>
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
