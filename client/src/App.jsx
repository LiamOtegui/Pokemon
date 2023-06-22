import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import Landing from "./views/Landing/Landing";
import Home from "./views/Home/Home";
import Detail from "./views/Detail/Detail";
import Create from "./views/Create/Create";

import { getTypes, getPokemons } from "./redux/actions";


function App() {
  const dispatch = useDispatch();


  useEffect(() => {
    document.title = "Pokemon";
    dispatch(getTypes())
  }, [dispatch]);

  useEffect(() => {
    dispatch(getPokemons())
  }, [dispatch])  

  return (
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/pokemons/" element={<Home />} />
          <Route path="/pokemons/detail/:id" element={<Detail />} />
          <Route path="/create" element={<Create />} />
        </Routes>
  );
}

export default App;
