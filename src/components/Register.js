import React, {useState} from 'react';

function Register({ onRegister }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    console.log(`%c[Register] catch handleSubmit`, 'color: violet;')
    // Передаём значения управляемых компонентов во внешний обработчик
    onRegister({ email, password });
  }
    return (
        <form className="sign-in" onSubmit={handleSubmit}>
          <h2 className="sign-in__title">Регистрация</h2>
          <input
            id="Email-input"
            name="Email"
            className="sign-in__field"
            placeholder="Email"
            value={email}
            onChange={(e) => { setEmail(e.target.value) }}
            type="text"
            minLength="2"
            maxLength="30"
            required
          />
          <input
            id="password-input"
            name="password"
            className="sign-in__field"
            placeholder="Пароль"
            value={password}
            onChange={(e) => { setPassword(e.target.value) }}
            type="password"
            minLength="2"
            maxLength="30"
            required
          />
          <button type="submit" className="sign-in__button">
            Зарегистрироваться
          </button>
          <p className="sign-in__info">Уже зарегистрированы? Войти</p>
      </form>
    );
  }

  export default Register;
