import styles from "./Card.module.css"

function Card({name, text, date}) {
    return (<div className= {styles.Card}>
        {name}({date}): {text}
      </div>
    );
  }
  
  export default Card;
  