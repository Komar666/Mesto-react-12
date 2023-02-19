import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ onAuthorize }) {

  const navigate = useNavigate()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    console.log(`%c[Login] catch handleSubmit`, 'color: violet;')
    // Передаём значения управляемых компонентов во внешний обработчик
    onAuthorize({ email, password });
  }
    return (
        <form className="sign-in" onSubmit={handleSubmit}>
          <h2 className="sign-in__title">Вxод</h2>
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
            Войти
          </button>
          <p className="sign-in__info">
            <span>Нет аккаунта? Тогда пошел наxер.</span>
            <span style={{ color: 'red' }} onClick={() => navigate('/sign-up')}>Пойти наxер</span>
          </p>
      </form>
    );
  }

  export default Login;
