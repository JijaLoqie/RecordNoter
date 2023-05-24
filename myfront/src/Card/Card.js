import styles from "./Card.module.css"

function Card({name, text, date}) {
    return (<div className= {styles.Card}>
        <div className={styles.Name}>{name}:</div><div className={styles.Text}>{text}</div>
        <div className={styles.Date}>({date})</div>
      </div>
    );
  }
  
  export default Card;
  