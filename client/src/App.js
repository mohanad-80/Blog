import Navbar from "./Navbar.jsx";
import Home from "./pages/Home.jsx";
import Create from "./pages/Create.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Footer from "./Footer.jsx";
import Post from "./pages/post.jsx";
import Edit from "./pages/Edit.jsx";
import Hero from "./pages/Hero.jsx";
import { Route, Routes } from "react-router-dom";
import ScrollUp from "./ScrollUp.jsx";

function App() {
  return (
    <div>
      <Navbar />
      <div className="body-container">
        <div className="container">
          <Routes>
            <Route
              path="/"
              element={
                <div>
                  <Hero />
                  <Home />
                </div>
              }
            />
            <Route path="/post/:id" element={<Post />} />
            <Route path="/create" element={<Create />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/edit" element={<Edit />} />
          </Routes>
        </div>
      </div>
      <ScrollUp />
      <Footer />
    </div>
  );
}

export default App;
