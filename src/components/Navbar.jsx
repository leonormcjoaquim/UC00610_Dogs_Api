import '../css/navbar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar({ toggleTheme, theme }) {
    const [solid, setSolid] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            setSolid(window.scrollY > 80);
        };

        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <nav className={`navbar navbar-expand-lg ${solid ? "navbar-dark navbar-solid" : "navbar-light navbar-transparent"}`}>
            <div className="container">
                <Link className="navbar-brand" to="/"> CãoPanheiros </Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto align-items-lg-center">
                        <li className="nav-item">
                            <NavLink to="/" className="nav-link" end>Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/dogs" className="nav-link">Cães</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/fun-facts" className="nav-link">Fun Facts</NavLink>
                        </li>
                    </ul>
                    <button className="btn theme-toggle ms-lg-3" onClick={toggleTheme}> 
                        {theme === "light" ? "Dark mode" : "Light mode"}
                    </button>
                </div>
            </div>
        </nav>
    );
}
