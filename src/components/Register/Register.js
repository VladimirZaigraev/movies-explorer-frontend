//Register — компонент страницы регистрации.
import React from 'react'
import { Link } from 'react-router-dom'
import { Logo } from '../Logo/Logo'
import './Register.sass'
import { useInput } from '../../hooks/useInput'
import { useValidation } from '../../hooks/useValidation'

export const Register = () => {
  const name = useInput('')
  const email = useInput('')
  const password = useInput('')

  console.log(name, email, password)
  const emailValidation = useValidation(email.value, { minLength: 3, isEmail: email.value })
  const passwordValidation = useValidation(password.value, { minLength: 6 })
  const nameValidation = useValidation(name.value, { minLength: 3 })

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
                value={name.value}
                onBlur={event => name.onBlur(event)}
                onChange={event => name.onChange(event)}
                type="text"
                className="form__input"
                id="name"
                name="name"
                // placeholder=""
                required
                minLength="3"
                maxLength="30"
                autoComplete="off" />
              <span className="form__input-erorr" id="name-error">{nameValidation.minLengthErrorMessage}</span>
            </fieldset>
            <fieldset className="form__fieldset e-mail">
              <label className="form__label " htmlFor="e-mail">E-mail</label>
              <input
                value={email.value}
                onBlur={event => email.onBlur(event)}
                onChange={event => email.onChange(event)}
                type="text"
                className="form__input"
                id="e-mail"
                name="e-mail"
                // placeholder=""
                required
                minLength="3"
                maxLength="30"
                autoComplete="off" />
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
                autoComplete="off" />
              <span className="form__input-erorr" id="password-error">{passwordValidation.minLengthErrorMessage}</span>
            </fieldset>
            <button disabled={!emailValidation.isValid || !passwordValidation.isValid || !nameValidation.isValid} className="form__button">Зарегестрироваться</button>
          </form>
          <p className="register__text redirect">
            Уже зарегистрированы?&nbsp;
            <Link to="sign-in" className="register__link redirect__link link">Войти</Link>
          </p>
        </div>
      </div>
    </section>
  )
}
