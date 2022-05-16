// Navigation — компонент отвечает за меню навигации на сайте.
import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import './Navigation.sass'
import account from '../../images/account.svg'

export const Navigation = () => {
  const [menuActive, setMenuActive] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  function updateScreenType() {
    setIsMobile(window.innerWidth <= 768);
  }

  useEffect(() => {
    window.addEventListener('resize', updateScreenType);
    return () => {
      window.removeEventListener('resize', updateScreenType);
    };

  }, []);

  return (
    <>
      {
        !isMobile ? (
          <div className="navigation">
            <ul className="navigation__list list">
              <li className="navigation__item item">
                <NavLink
                  className={({ isActive }) => isActive ? "navigation__link navigation__link_active link" : "navigation__link link"}
                  to='/movies'>
                  Фильмы
                </NavLink>
              </li>
              <li className="navigation__item item">
                <NavLink
                  className={({ isActive }) => isActive ? "navigation__link navigation__link_active link" : "navigation__link link"}
                  to='/saved-movies'>
                  Сохранённые фильмы
                </NavLink>
              </li>
            </ul>
            <NavLink
              className="navigation__account account link"
              to="/profile">Аккаунт
              <img src={account} alt="account icon" className="account__icon" />
            </NavLink>
          </div>
        ) : (
          <div className="navigation-mobile">
            <div className={menuActive ? "navigation-mobile__burger-btn burger-btn_active burger-btn" : "navigation-mobile__burger-btn burger-btn"}
              onClick={() => setMenuActive(!menuActive)}>
              <span className="burger-btn__span"></span>
            </div>
            <div className={menuActive ? " mobile-menu__overlay_active" : "mobile-menu__overlay"} />
            <div className={menuActive ? "navigation-mobile__menu mobile-menu mobile-menu_active" : "navigation-mobile__menu mobile-menu"} onClick={() => setMenuActive(!menuActive)}>
              <div className="mobile-menu__content">
                <ul className="mobile-menu__list list">
                  <li className="mobile-menu__item item">
                    <NavLink
                      // exact
                      to='/'
                      className={({ isActive }) => isActive ? "mobile-menu__link mobile-menu__link_active link" : "mobile-menu__link link"}>Главная</NavLink>
                  </li>
                  <li className="mobile-menu__item item">
                    <NavLink
                      to='/movies'
                      className={({ isActive }) => isActive ? "mobile-menu__link mobile-menu__link_active link" : "mobile-menu__link link"}>Фильмы</NavLink>
                  </li>
                  <li className="mobile-menu__item item">
                    <NavLink
                      to='/saved-movies'
                      className={({ isActive }) => isActive ? "mobile-menu__link mobile-menu__link_active link" : "mobile-menu__link link"}>Сохранённые фильмы</NavLink>
                  </li>
                </ul>
                <NavLink className="mobile-menu__account link" to='/profile'>Аккаунт  <img src={account} alt="account icon" className="account__icon" />
                </NavLink>
              </div>
            </div>
          </div>
        )
      }
    </>
  )
}
