import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import Card from "../../components/Card/Card";
import NavBar from "../../components/NavBar/NavBar";
import Loading from "../../components/Loading/Loading";
import Pagination from "../../components/Pagination/Pagination";

import { getPokemons, getPokemon } from "../../redux/actions";
import style from "./Home.module.css";
import Filter from "../../components/Filter/Filter";

// Home despacha/lleva la info al ESTADO GLOBAL (al store).
// Los componentes pueden acceder a la info del ESTADO GLOBAL.

// Con el useEffect se maneja el ciclo de vida del componente, para poder decirle que haga ALGO (un dispatch al estado global por ejemplo) cuando se monte el componente.
// Con el useDispatch despachamos la info al ESTADO GLOBAL.

const Home = () => {
  const [loading, setLoading] = useState(true); // loading es el estado y setLoading es la funcion que modifica ese estado. El estado loading se utiliza para indicar si la carga de datos está en progreso o ha finalizado.

  const location = useLocation(); // useLocation para obtener la ubicación actual...
  const searchParams = new URLSearchParams(location.search); // y luego se crea una instancia de URLSearchParams a partir de la propiedad search de la ubicación...
  const search = searchParams.get("search"); // esto permite manipular los parámetros de búsqueda de la URL y obtener valores específicos.

  const dispatch = useDispatch(); // El useDispatch es para enviar info. al ESTADO GLOBAL.
  const pokemons = useSelector((state) => state.pokemons); // El useSelector se utiliza para traer info. del ESTADO GLOBAL (por ejemplo aca me traigo la info de la propiedad pokemons del ESTADO GLOBAL).
  const filteredPokemons = useSelector((state) => state.filteredPokemons);

  const [currentPage, setCurrentPage] = useState(1);
  const [pokePerPage, setPokePerPage] = useState(12);

  const lastPokeIndex = pokePerPage * currentPage;
  const firstPokeIndex = lastPokeIndex - pokePerPage;

  let pokeInPage = filteredPokemons.slice(firstPokeIndex, lastPokeIndex);

  const setPageValue = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    setLoading(true);
    if (search) {
      dispatch(getPokemon(search)).then((res) => {
        setLoading(false);
      });
    } else {
      dispatch(getPokemons()).then((data) => setLoading(false));
    }
  }, [dispatch, search]); // La funcion se ejecuta cuando el componente se monta ({...}) o cuando cambie alguna de las dependencias (las variables dentro del array) del array de dependencias ([...]). Si ocurre un cambio en el array de dependencias, la funcion se vuelve a ejecutar. Sin el array de dependencias ocurre un loop.
  // Cada variable que yo ponga en la funcion, es conveniente colocarlo en el array de dependencias, porque puede llegar a aparecer un error.

  if (loading) {
    return <Loading />;
  }

  return (
    <div className={style.homeContainer}>
      <NavBar setPageValue={setPageValue} />
      <div className={style.filterContainer}>
        <Pagination
          allPoke={pokemons}
          setPageValue={setPageValue}
          pokePerPage={pokePerPage}
          currentPage={currentPage}
        />
        <Filter pokemons={pokemons} />
      </div>
      <div className={style.cardContainer}>
        {
          pokeInPage.map((poke) => (
            <Card
              key={poke.id}
              poke={poke}
            />
          ))
        }
      </div>
    </div>
  );
};

export default Home;