import styles from "./SmallButton.module.css"

function SmallButton({icon, handler}) {
    return (<div className={styles.SmallButton}
    ><span id={ icon == "Right" && styles.Right ||
                icon == "Left" && styles.Left ||
                icon == "Accounts" && styles.Accounts ||
                icon == "Add" && styles.Add ||
                null
      } className={styles.Icon}></span>
    <a href="#"></a><span></span>
    </div>
    );
  }
  
  export default SmallButton;
  