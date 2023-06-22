import { useState } from "react";
import { useDispatch } from "react-redux";
import { getDetail } from "../../redux/actions";
import { useNavigate } from "react-router-dom";
import { toTitleCase } from "../../utils/helpers";
import style from "./Card.module.css";

export const Card = ({ poke }) => {
  const [isHover, setIsHover] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const types = poke.types || poke.Types

  const handleOnClick = () => {
    dispatch(getDetail(poke.id));
    navigate(`/pokemons/detail/${poke.id}`);
  };

  const handleMouseEnter = () => {
    setIsHover(true);
  };
  const handleMouseLeave = () => {
    setIsHover(false);
  };

  return (
    <>
      <div
        className={style.container}
        onMouseEnter={() => handleMouseEnter()}
        onMouseLeave={() => handleMouseLeave()}
        onClick={() => handleOnClick()}
        style={{ cursor: "pointer" }}
      >
        <div className={style.content}>
          <div>
            {
            types.map((type, index) => (
              <div key={index} className={style.types}>{type.toUpperCase()}</div>  // el index es solo para que no aparezca ese warning en la consola.
            ))
          }
          </div>
          <div>{`#` + poke.id}</div>
          <div style={{ fontSize: "24px" }}>{toTitleCase(poke.name)}</div>
          <img src={poke.img} alt="" className={style.pokeImg} />
        </div>
      </div>
    </>
  );
};

export default Card;
