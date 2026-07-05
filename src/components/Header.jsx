import { Link, NavLink } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useFavorites } from "../context/FavoritesContext";
import "./Header.css";

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const { favoriteIds } = useFavorites();

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link to="/" className="site-header__brand">
          WanderStay
        </Link>

        <nav className="site-header__nav">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "is-active" : "")}
            end
          >
            Explore
          </NavLink>
          <NavLink
            to="/favorites"
            className={({ isActive }) => (isActive ? "is-active" : "")}
          >
            Saved
            {favoriteIds.length > 0 && (
              <span className="site-header__badge">{favoriteIds.length}</span>
            )}
          </NavLink>
        </nav>

        <button
          type="button"
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>
      </div>
    </header>
  );
}