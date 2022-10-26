import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <>
      <header className="app_header">
        <div className="app_position">
          <Link className="app_link" to="/">
            Main Page
          </Link>
          <Link className="app_link" to="/about">
            About Us
          </Link>
          <Link className="app_link" to="/end">
            404
          </Link>
        </div>
      </header>
    </>
  );
}
export { Header };
