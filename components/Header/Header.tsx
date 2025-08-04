"use client";

import css from "./Header.module.css";

const Header = () => {
  return (
    <header className={css.header}>
      <nav>
        <ul>
          <li>Home</li>
          <li>Notes</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
