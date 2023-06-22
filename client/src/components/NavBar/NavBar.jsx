import { NavLink } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import style from "./NavBar.module.css";

const NavBar = ({ setPageValue }) => {

  return (
    <div className={style.navBar}>
      <NavLink className={style.nav} to="/pokemons">
        Pokemons
      </NavLink>

      <SearchBar setPageValue={setPageValue} />

      <NavLink className={style.nav} to="/create">
        Create
      </NavLink>
    </div>
  );
};

export default NavBar;
