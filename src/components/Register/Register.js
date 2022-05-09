//Register — компонент страницы регистрации.
import React from 'react'
import { Link } from 'react-router-dom'
import { Logo } from '../Logo/Logo'
import './Register.sass'

export const Register = () => {
  return (
    <section className="register">
      <div className="container register__container">
        <div className="register__wrapper">
          <Logo />
          <h3 className="register__title">Добро пожаловать!</h3>
          <form action="" className="form register__form">
            <fieldset className="form__fieldset name">
              <label className="form__label " htmlFor="name">Имя</label>
              <input
                // value={''}
                // onBlur={''}
                type="text"
                className="form__input"
                id="name"
                name="name"
                // placeholder=""
                required
                minLength="3"
                maxLength="30"
                autoComplete="off" />
              <span className="form__input-erorr" id="name-error">Текст ошибки</span>
            </fieldset>
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
          <p className="register__text redirect">
            Ещё не зарегистрированы?&nbsp;
            <Link to="sign-in" className="register__link redirect__link link">Войти</Link>
          </p>
        </div>
      </div>
    </section>
  )
}
