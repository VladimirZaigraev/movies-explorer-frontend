import React from 'react'
import './Checkbox.sass'

export const Checkbox = ({ short, setShort }) => {
  return (
    <div className="checkbox">
      <input
        className="checkbox__input"
        id="short-film"
        type="checkbox"
        onChange={() => setShort(!short)} />
      <label
        className="checkbox__label"
        htmlFor="short-film">
      </label>
    </div>
  )
}
