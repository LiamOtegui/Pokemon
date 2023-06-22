import style from "./Landing.module.css";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  const handleNavigate = (route) => {
    navigate(route);
  };

  return (
    <div className={style.wrapper}>
      <img className={style.img} src='ash-pikachu.png' alt=''/>
      <div className={style.container}>
        <button onClick={() => handleNavigate(`/pokemons`)} className={style.button}>
          Start!
        </button>
      </div>
    </div>
  );
};

export default Landing;
