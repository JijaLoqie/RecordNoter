import styles from "./SmallButton.module.css"

function SmallButton({icon, handler, text}) {
    return (<div onClick={handler} className={styles.SmallButton}
    ><span id={ icon == "Right" && styles.Right ||
                icon == "Left" && styles.Left ||
                icon == "Accounts" && styles.Accounts ||
                icon == "Add" && styles.Add ||
                null
      } className={styles.Icon}>{text}</span>
    <a href="#"></a><span></span>
    </div>
    );
  }
  
  export default SmallButton;
  