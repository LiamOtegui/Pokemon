import NavBar from "../../components/NavBar/NavBar";

import style from "./Loading.module.css";
import pokeball from "../../assets/pokeball2.png";

const Loading = () => {
  return (
    <>
      <NavBar />
      <div className={style.container}>
        <img src={pokeball} alt="Pokeball" className={style.spinner} />
        <p className={style.p}>Loading...</p>
      </div>
    </>
  );
};

export default Loading;
