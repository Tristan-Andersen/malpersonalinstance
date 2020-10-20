import React from 'react';
import { Link } from "@reach/router";

const Navbar = () => {
    return (
        <nav className="navigation-bar">
            <Link className="navigation-link" to="/">Home</Link>
            <Link className="navigation-link" to="anime">Anime</Link>
            <Link className="navigation-link" to="downloads">Downloads</Link>
        </nav>
    );
}

export default Navbar;