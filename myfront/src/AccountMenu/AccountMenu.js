import { useState } from "react";
import styles from "./AccountMenu.module.css";
import axios from "axios";

function AccountMenu({ handleEnterSystem }) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const isExists = (log) => {
    axios.get("/userExists", { username: log }).then((response) => {
      return response.data.exists;
    });
  };

  const isCorrectPassword = (log, pass) => {
    axios
      .get("/checkUserPassword", { username: log, password: pass })
      .then((response) => {
        return response.data.correct;
      });
  };
  const addUser = () => {
    axios
      .post("/addUser", { username: login, password: password })
      .then((response) => {
        console.log(response);
      });
  };

  // Функция для обработки нажатия на кнопку "войти"
  function handleLogin() {
    if (!isExists(login)) {
      alert("Такого пользователя нет!");
      return;
    }
    if (!isCorrectPassword(login, password)) {
      alert("Неверный пароль!");
      return;
    }

    handleEnterSystem(login);
    alert("Вы вошли в систему!");
  }

  // Функция для обработки нажатия на кнопку "зарегистрироваться"
  function handleRegister() {
    var loginRegex = /^[A-Za-z0-9_-]{3,16}/; // Логин должен содержать от 3 до 16 символов из латинских букв, цифр, подчеркивания или дефиса
    var passwordRegex = /^[A-Za-z0-9_-]{3,16}/; // Пароль должен содержать не менее 6 символов из цифр, спец. символов, латинских букв в верхнем и нижнем регистрах

    // Проверяем логин и пароль на соответствие регулярным выражениям
    if (!loginRegex.test(login)) {
      alert(`Проверь введённые данные :(
		Логин должен содержать от 3 до 16 символов из латинских букв, цифр, подчеркивания или дефиса`);
      return;
    }
    if (!passwordRegex.test(password)) {
      alert(`Проверь введённые данные :(
			Пароль должен содержать не менее 6 символов из цифр, спец. символов, латинских букв в верхнем и нижнем регистрах`);
      return;
    }
    if (isExists(login)) {
      alert("Пользователь с таким логином уже существует!");
      return;
    }
    addUser();
    alert("Регистрация прошла успешно!");
    handleLogin();
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
