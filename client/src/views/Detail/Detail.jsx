import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import Loading from "../../components/Loading/Loading";

import { getDetail, clearDetail } from "../../redux/actions";

import { StatsBox } from "../../components/StatsBox/StatsBox";
import style from "./Detail.module.css";

import { toTitleCase } from "../../utils/helpers";

const Detail = () => {
  const { id } = useParams();
  const [currentId, setCurrentId] = useState(id);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const pokemon = useSelector((state) => state.detail);
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentId >= 151) {
    } else {
      dispatch(getDetail(currentId)).then(() => {
        setCurrentId(Number(currentId) + 1);
        navigate(`/pokemons/detail/${Number(id) + 1}`);
      });
    }
  };

  const handlePrev = () => {
    if (currentId <= 1) {
    } else {
      dispatch(getDetail(currentId)).then(() => {
        setCurrentId(Number(currentId) - 1);
        navigate(`/pokemons/detail/${Number(id) - 1}`);
      });
    }
  };

  useEffect(() => {
    setLoading(true);
    dispatch(getDetail(currentId)).then((res) => { // Aca se monta el detail (componente),...
      // console.log(pokemon)
      setLoading(false);
    });
    return () => {                                 // el return quiere decir que se desmonta ese componente...
      dispatch(clearDetail());                     // y cuando se desmonte, limpiamos la propiedad "detail" del ESTADO GLOBAL, devolviendo (con la accion de clearDetail), un objeto vacio (puse un {} en el payload del action creator), para asi no figura el detail ANTERIOR por unos milisegundos y para que no quede cargado el detail de ese pokemon en el REDUX DEV TOOLS.
    };
  }, [dispatch, currentId]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <NavBar />
      <div className={style.wrapper}>
        <div className={style.buttonContainer}>
          <button className={style.btnBack} onClick={() => navigate(`/pokemons`)}>
            Back
          </button>
          {pokemon.source === "api" && (
            <>
              <button className={style.btnBack} onClick={() => handlePrev()}>
                PREV
              </button>
              <button className={style.btnBack} onClick={() => handleNext()}>
                NEXT
              </button>
            </>
          )}
        </div>
        <div className={style.container}>
          <div className={style.cardDetail}>
            <div
              className={style.section}
            >
              <div className={style.content} style={{ fontSize: "32px" }}>
                {pokemon.name}
              </div>
              <div className={style.content} style={{ flex: "0.2" }}>
                #{pokemon.id}
              </div>
            </div>

            <div className={style.content}>
              <img className={style.pokeImg} src={pokemon.img} alt="" />
            </div>

            <div className={style.section}>
              <div className={style.title}>TYPES</div>
              <div className={style.content}>
                <div style={{ display: "flex", gap: "32px", padding: "5px" }}>
                  {pokemon.source === "api" &&
                    pokemon.types &&
                    pokemon.types.map((type) => (
                      <div className={style.type}>
                        {toTitleCase(type)}
                      </div>
                    ))}
                  {pokemon.source === "bd" &&
                    pokemon.Types &&
                    pokemon.Types.map((Types) => (
                      <div className={style.type} key={Types.id}>
                        {toTitleCase(Types.name)}
                      </div>
                    ))}
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: "4px" }}>
              <div className={style.section}>
                <div className={style.title}>Weight</div>
                <div className={style.content}>{pokemon.weight} kg</div>
              </div>

              <div className={style.section}>
                <div className={style.title}>Height</div>
                <div className={style.content}>{pokemon.height} m</div>
              </div>
            </div>
          </div>
          <div className={style.stats}>
            {pokemon.source === "api" && pokemon.stats && <StatsBox stats={pokemon.stats} />}
            {pokemon.source === "bd" &&
              <div className={style.statsDb}>
                <div className={style.statRow}>
                  <span>HP: {pokemon.hp}</span>
                  <span>ATK: {pokemon.atk}</span>
                </div>
                <div className={style.statRow}>
                  <span>DEF: {pokemon.def}</span>
                  <span>SPATK: {pokemon.spatk}</span>
                </div>
                <div className={style.statRow}>
                  <span>SPDEF: {pokemon.spdef}</span>
                  <span>SPEED: {pokemon.speed}</span>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default Detail;