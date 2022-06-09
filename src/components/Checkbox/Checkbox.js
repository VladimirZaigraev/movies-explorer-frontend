import React from 'react'
import './Checkbox.sass'

export const Checkbox = ({ short, setShort }) => {
  const hendelClick = () => {
    setShort(short ? false : true)
  }
  return (
    <div className="checkbox">
      <input
        className="checkbox__input"
        id="short-film"
        type="checkbox"
        defaultChecked={!short}
        onClick={hendelClick} />
      <label
        className="checkbox__label"
        htmlFor="short-film">
      </label>
    </div>
  )
}
