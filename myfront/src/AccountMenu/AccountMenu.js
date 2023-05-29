import { useState } from 'react';
import styles from "./AccountMenu.module.css";

function AccountMenu({ name, text, date, handlers }) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  // Функция для обработки нажатия на кнопку "войти"
  function handleLogin() {
    // Здесь можно добавить логику для проверки логина и пароля
    // и перехода на другую страницу в случае успеха
    alert(`Вы вошли как ${login}`);
  }

  // Функция для обработки нажатия на кнопку "зарегистрироваться"
  function handleRegister() {
    // Здесь можно добавить логику для регистрации нового пользователя
    // и перехода на другую страницу в случае успеха
    alert(`Вы зарегистрировались как ${login}`);
  }

  
  return (
    <>
      <div className={styles.main}>
        <div className={styles.infoPage}>
          <h1>Добро пожаловать!</h1>
          <p>
            Я сделал эту страничку в качестве тестового задания для компании
            WelbeX
          </p>
        </div>
        <div className={styles.loginPage}>
          <form className={styles.loginForm}>
            <div className={styles.formGroup}>
              <input
                type="text"
                id="login"
                value={login}
                placeholder="Login"
                onChange={(e) => setLogin(e.target.value)}
              />
            </div>
            <div className={styles.formGroup}>
              <input
                type="password"
                id="password"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className={styles.formButtons}>
              <button type="button" onClick={handleLogin}>
                Войти
              </button>
              <button type="button" onClick={handleRegister}>
                Зарегистрироваться
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AccountMenu;
