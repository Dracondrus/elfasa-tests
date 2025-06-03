import { useState } from "react";
import { Outlet } from "react-router-dom";
import ELFASA from "../assets/elfasa__logotype.jpg";

const MainLayout: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navigateTo = (path: string) => {
    setMenuOpen(false);
    window.location.href = path;
  };

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
          <li onClick={() => navigateTo("/")}>Bosh sahifa</li>
          <li onClick={() => navigateTo("/falsafa")}>Falsafa</li>
          <li onClick={() => navigateTo("/dinshunoslik")}>Dinshunoslik</li>
          <li onClick={() => navigateTo("/english")}>English</li>
          <li onClick={() => navigateTo("/algoritm")}>Algoritm</li>
          <li onClick={() => navigateTo("/dasturlash")}>Dasturlash</li>
        </ul>
      </div>

      <Outlet />
    </div>
  );
};

export default MainLayout;
