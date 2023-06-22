import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";

import style from "./SearchBar.module.css";

const SearchBar = ({ setPageValue }) => {
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleSearch = async () => {
    if (searchValue) {
      // dispatch(getPokemon(searchValue)).then(() => {
      // });
      navigate(`/pokemons/?search=${searchValue}`);
      setPageValue(1);
    } else {
      navigate(`/pokemons`);
      setPageValue(1);
      // dispatch(getPokemons());
    }
  };

  return (
    <>
      <div className={style.container}>
        <input
          className={style.searchBar}
          onKeyUp={(e) => setSearchValue(e.target.value)}
          id="searchInput"
          name="searchInput"
          placeholder="Search a Pokemon here..."
          type="text"
        />
        <button className={style.searchButton} onClick={() => handleSearch()}>
          Search
        </button>
      </div>
    </>
  );
};

export default SearchBar;
