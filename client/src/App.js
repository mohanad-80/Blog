import Navbar from "./Navbar.jsx";
import Home from "./pages/Home.jsx";
import Create from "./pages/Create.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Footer from "./Footer.jsx";
import Post from "./pages/post.jsx";
import Edit from "./pages/Edit.jsx";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/create" element={<Create />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/edit" element={<Edit />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
