// Profile — компонент страницы изменения профиля.
import React, { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Header } from '../Header/Header';
import { useInput } from '../../hooks/useInput'
import { useValidation } from '../../hooks/useValidation'
import { CurrentUserContext } from '../../context/CurrentUserContext'
import './Profile.sass'

export const Profile = ({ isLoggedIn, onEditProfile, onSignOut, serverMessage, chekStatusErrorServer }) => {
  const currentUser = useContext(CurrentUserContext);
  const [edit, setEdit] = useState(false);

  const name = useInput('');
  const email = useInput('');

  const emailValidation = useValidation(email.value, { minLength: 3, isEmail: email.value });
  const nameValidation = useValidation(name.value, {
    minLength: 3, isName: name.value
  });
  // console.log(chekStatusErrorServer)
  // useEffect(() => {
  //   if (chekStatusErrorServer) {
  //     setEdit(true)
  //   } else {
  //     setEdit(false)
  //   }
  // }, [chekStatusErrorServer]);

  // console.log(errorServerMessage)

  console.log(edit)
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event)
    onEditProfile(name.value, email.value);
    // setEdit(false)
  };



  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <section className="profile">
        <div className="container profile__container">
          <div className="profile__wrapper">
            {
              edit ? (
                <div className="profile__edit edit">
                  <h3 className="profile__title">
                    Внесите новые данные
                  </h3>
                  <form className="form edit__form" onSubmit={handleSubmit}>
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
                      <span className="form__input-erorr" id="name-error">{nameValidation.minLengthErrorMessage} {nameValidation.nameErrorMessage}</span>
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
                      <span className="form__input-erorr" id="e-mail-error">{emailValidation.emailErrorMessage} {emailValidation.minLengthErrorMessage} </span>
                    </fieldset>
                    <div className="form__footer">
                      <span className={"form__server-message server-message " + (chekStatusErrorServer ? " server-message__error" : "server-message__success")} >{serverMessage}</span>
                      <button className="form__button edit__button" disabled={!emailValidation.emailError || !emailValidation.minLengthError || !nameValidation.minLengthError} type="submit">Сохранить</button>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="profile__user user">
                  <h3 className="profile__title">
                    Привет, {currentUser.name}
                  </h3>
                  <div className="user__info">
                    <p className="user__title">Имя</p>
                    <p className="user__data">{currentUser.name}</p>
                  </div>
                  <div className="user__info">
                    <p className="user__title">E-mail</p>
                    <p className="user__data">{currentUser.email}</p>
                  </div>
                </div>
              )
            }
            <div className="profile__footer">
              {
                (!edit ? <button className="profile__edit-btn" onClick={() => setEdit(!edit)}>Редактировать</button> : <button className="profile__edit-btn" onClick={() => setEdit(!edit)}>Отменить редактирование</button>)
              }
              <Link className="profile__logout link"
                onClick={onSignOut}
                to="/">Выйти из аккаунта</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
