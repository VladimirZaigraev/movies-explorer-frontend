import React from 'react'
import './Checkbox.sass'

export const Checkbox = () => {
  return (
    <div className="checkbox">
      <input
        className="checkbox__input"
        id="short-film" type="checkbox" />
      <label
        className="checkbox__label"
        htmlFor="short-film">
      </label>
    </div>
  )
}
