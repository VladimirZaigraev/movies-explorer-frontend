//Login — компонент страницы авторизации.
import React from 'react'
import { Link } from 'react-router-dom'
import { Logo } from '../Logo/Logo'
import './Login.sass'
import { useInput } from '../../hooks/useInput'
import { useValidation } from '../../hooks/useValidation'

export const Login = ({ onLogin, serverMessage, chekStatusErrorServer }) => {
  const email = useInput('')
  const password = useInput('')

  const emailValidation = useValidation(email.value, { minLength: 3, maxLength: 30, isEmail: email.value })
  const passwordValidation = useValidation(password.value, { minLength: 8, maxLength: 30 })

  const handleSubmit = (event) => {
    event.preventDefault();
    onLogin(email.value, password.value);
  };

  return (
    <section className="login">
      <div className="container login__container">
        <div className="login__wrapper">
          <Logo />
          <h3 className="login__title">Рады видеть!</h3>
          <form action="" className="form login__form login-form" onSubmit={handleSubmit}>
            <fieldset className="form__fieldset e-mail">
              <label className="form__label " htmlFor="email">E-mail</label>
              <input
                value={email.value}
                onBlur={event => email.onBlur(event)}
                onChange={event => email.onChange(event)}
                type="text"
                className="form__input"
                id="email"
                name="email"
                // placeholder=""
                required
                minLength="3"
                maxLength="30"
                autoComplete="off"
              />
              <span className="form__input-erorr" id="e-mail-error">{emailValidation.emailErrorMessage} {emailValidation.minLengthErrorMessage}</span>
            </fieldset>
            <fieldset className="form__fieldset password">
              <label className="form__label password__label" htmlFor="password">Пароль</label>
              <input
                value={password.value}
                onBlur={event => password.onBlur(event)}
                onChange={event => password.onChange(event)}
                type="password"
                className="form__input"
                id="password"
                name="password"
                // placeholder=""
                required
                minLength="3"
                maxLength="30"
                autoComplete="off"
              />
              <span className="form__input-erorr" id="password-error">{passwordValidation.minLengthErrorMessage}</span>
            </fieldset>
            <div className="form__footer login-form__footer">
              <span className={"form__server-message server-message " + (chekStatusErrorServer ? " server-message__error" : "server-message__success")} >{serverMessage}</span>
              <button disabled={!emailValidation.emailError || !emailValidation.minLengthError || !passwordValidation.minLengthError} className="form__button login__button">Войти</button>
            </div>
          </form>
          <p className="login__text redirect">
            Ещё не зарегистрированы?&nbsp;
            <Link to="/signup" className="login__link redirect__link link">Регистрация</Link>
          </p>
        </div>
      </div>
    </section>
  )
}
