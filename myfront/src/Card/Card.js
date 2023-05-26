import SmallButton from "../SmallButton/SmallButton";
import styles from "./Card.module.css";
import { useState } from "react";

function Card({ name, text, date, handlers }) {
  const [isHovered, setHovered] = useState(false);

  return (
    <div
      className={styles.Card}
      onMouseEnter={() => {
        setHovered(true);
      }}
      onMouseLeave={() => {
        setHovered(false);
      }}
    >
      <div className={styles.Name}>{name}:</div>
      <div className={styles.Text}>{text}</div>
      <div className={styles.Date}>({date})</div>
      <div className={styles.Cont}>
        {isHovered === true && (
          <>
            <SmallButton
              text="Remove"
              className={styles.Action}
              id={styles.Remove}
			  handler={handlers.Delete}
            />
            <SmallButton
              text="Edit"
              className={styles.Card}
              id={styles.Edit}
              handler={handlers.Editor}
            />
            <SmallButton
              text="View"
              className={styles.Card}
              id={styles.View}
              handler={handlers.Reader}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default Card;
