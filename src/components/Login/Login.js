//Login — компонент страницы авторизации.
import React from 'react'
import { Link } from 'react-router-dom'
import { Logo } from '../Logo/Logo'
import './Login.sass'

export const Login = () => {
  return (
    <section className="login">
      <div className="container login__container">
        <div className="login__wrapper">
          <Logo />
          <h3 className="login__title">Рады видеть!</h3>
          <form action="" className="form login__form">
            <fieldset className="form__fieldset e-mail">
              <label className="form__label " htmlFor="e-mail">E-mail</label>
              <input
                // value={''}
                // onBlur={''}
                type="text"
                className="form__input"
                id="e-mail"
                name="e-mail"
                // placeholder=""
                required
                minLength="3"
                maxLength="30"
                autoComplete="off" />
              <span className="form__input-erorr" id="e-mail-error">Текст ошибки</span>
            </fieldset>
            <fieldset className="form__fieldset password">
              <label className="form__label password__label" htmlFor="password">Пароль</label>
              <input
                // value={''}
                // onBlur={''}
                type="password"
                className="form__input"
                id="password"
                name="password"
                // placeholder=""
                required
                minLength="3"
                maxLength="30"
                autoComplete="off" />
              <span className="form__input-erorr" id="password-error">Текст ошибки</span>
            </fieldset>
            <button className="form__button">Войти</button>
          </form>
          <p className="login__text redirect">
            Ещё не зарегистрированы?&nbsp;
            <Link to="sign-in" className="login__link redirect__link link">Зарегестрироваться</Link>
          </p>
        </div>
      </div>
    </section>
  )
}
