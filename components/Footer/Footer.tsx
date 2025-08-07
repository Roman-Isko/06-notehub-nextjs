"use client";
import Link from "next/link";
import css from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={css.footer}>
      <Link href="/" aria-label="Home">
        NoteHub
      </Link>
      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/notes">Notes</Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;
