import style from "./StatsBox.module.css";
import { keyNames } from "../../utils/keyNames";

export const StatsBox = ({ stats }) => {
  return (
    <div className={style.statsContainer} style={{ flexDirection: "column", gap: "5px" }}>
      <div>
      </div>
      <div className={style.box}>
        {Object.keys(stats).map((key) => {
          const formattedKey = keyNames[key];
          return (
            <div key={key} className={style.item}>
              <div className={style.name}>{formattedKey}</div>
              <div className={style.bar}>
                <div className={style.value}>
                  {stats[key]}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

