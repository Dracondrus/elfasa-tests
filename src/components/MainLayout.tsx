import { useState } from "react";
import { Outlet } from "react-router-dom";
import ELFASA from "../assets/elfasa__logotype.jpg";

const MainLayout: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="container">
      <div className="navbar">
        <div className="logotype">
          <img src={ELFASA} loading="lazy" height={30} width={30} alt="logo" />
          <span>E L F A S A</span>
        </div>
        <div
          className={`burger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
        <ul className={`menu-overlay ${menuOpen ? "show" : ""}`}>
              <li><a href="/" onClick={() => setMenuOpen(false)}>Bosh sahifa</a></li>
          <li><a href="/falsafa" onClick={() => setMenuOpen(false)}>Falsafa</a></li>
          <li><a href="/dinshunoslik" onClick={() => setMenuOpen(false)}>Dinshunoslik</a></li>
          <li><a href="/english" onClick={() => setMenuOpen(false)}>English</a></li>
          <li><a href="/algoritm" onClick={() => setMenuOpen(false)}>Algoritm</a></li>
          <li><a href="/dasturlash" onClick={() => setMenuOpen(false)}>Dasturlash</a></li>
        </ul>
      </div>

      <Outlet />
    </div>
  );
};

export default MainLayout;
