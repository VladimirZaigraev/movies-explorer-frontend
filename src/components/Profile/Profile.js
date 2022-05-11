// Profile — компонент страницы изменения профиля.
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Header } from '../Header/Header';
import './Profile.sass'

export const Profile = () => {
  const [edit, setEdit] = useState(false);

  return (
    <>
      <Header isLogin={true} />
      <section className="profile">
        <div className="container profile__container">
          <div className="profile__wrapper">
            {
              edit ? (
                <div className="profile__edit edit">
                  <h3 className="profile__title">
                    Внесите новые данные
                  </h3>
                  <form action="" className="form edit__form">
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
                    <button className="form__button edit__button" onClick={() => setEdit(!edit)}>Сохранить</button>
                  </form>
                </div>
              ) : (
                <div className="profile__user user">
                  <h3 className="profile__title">
                    Привет, Виталий!
                  </h3>
                  <div className="user__info">
                    <p className="user__title">Имя</p>
                    <p className="user__data">Виталий</p>
                  </div>
                  <div className="user__info">
                    <p className="user__title">E-mail</p>
                    <p className="user__data">pochta@yandex.ru</p>
                  </div>
                </div>
              )
            }
            <div className="profile__footer">
              {
                (!edit ? <button className="profile__edit-btn" onClick={() => setEdit(!edit)}>Редактировать</button> : '')
              }
              <Link className="profile__logout link" to="/">Выйти из аккаунта</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
