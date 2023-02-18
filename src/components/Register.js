import React, {useState} from 'react';

function Register() {
    return (
        <form className="sign-in">
        <h2 class="sign-in__title">Регистрация</h2>
        <input
          id="Email-input"
          name="Email"
          className="sign-in__field"
          placeholder="Email"
          onChange={() => {}}
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
          onChange={() => {}}
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