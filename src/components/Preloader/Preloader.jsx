//Preloader — отвечает за работу прелоадера.
import React from 'react'
import './Preloader.sass'

export const Preloader = () => {
  return (
    <div className="preloader">
      <div className="preloader__container">
        <span className="preloader__round"></span>
      </div>
    </div>
  )
}
