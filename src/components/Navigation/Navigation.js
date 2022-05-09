// Navigation — компонент отвечает за меню навигации на сайте.
import React from 'react'
import { NavLink } from 'react-router-dom'
import './Navigation.sass'
import account from '../../images/account.svg'

export const Navigation = () => {
  return (
    <div className="navigation">
      <ul className="navigation__list list">
        <li className="navigation__item item">
          <NavLink
            className="navigation__link link"
            to='movies'>
            Фильмы
          </NavLink>
        </li>
        <li className="navigation__item item">
          <NavLink
            className="navigation__link link"
            to='#'>
            Сохранённые фильмы
          </NavLink>
        </li>
      </ul>
      <NavLink className="navigation__account account link" to="">Аккаунт  <img src={account} alt="account icon" className="account__icon" />
      </NavLink>
    </div>
  )
}
