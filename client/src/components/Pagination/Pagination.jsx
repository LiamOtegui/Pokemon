import React from "react";
import style from "../Pagination/Pagination.module.css";

import { calculateMaxPages } from "../../utils/calculateMaxPages";
import { useSelector } from "react-redux";
// export const calculateMaxPages = (allPoke, pokePerPage, pages) => {
//   for (let i = 1; i <= Math.ceil(allPoke.length / pokePerPage); i++) {
//     pages.push(i);
//   }
// };


const Pagination = ({ pokePerPage, setPageValue, allPoke, currentPage }) => {
  const pages = [];
  calculateMaxPages(allPoke, pokePerPage, pages);

  const pokemons = useSelector((state) => state.pokemons);

  const handlerPrev = () => {
    if (currentPage === 1) return;
    setPageValue(currentPage - 1); // Si no se cumple el if, entonces restale 1.
  };

  const handlerNext = () => {
    if (currentPage === pages.length) return;
    setPageValue(currentPage + 1); // Si no  se cumple el if, entonces sumale 1.
  };

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div onClick={handlerPrev} className={style.prevNext}>
          <h4>{`<<<`}</h4>
        </div>

        <h2  className={style.currentPage}>{currentPage}</h2>

        <div className={style.pagesContainer}>
          {pages &&
            pages.map((page) => {
              return (
                <div
                  key={page}
                  onClick={() => setPageValue(page)}
                  className={`${style.pages} ${currentPage === page ? style.pressed : ""}`}
                >
                  <h2>{page}</h2>
                </div>
              );
            })}
        </div>

        <div onClick={handlerNext} className={style.prevNext}>
          <h4>{`>>>`}</h4>
        </div>

      </div>
    </div>
  );
};

export default Pagination;
