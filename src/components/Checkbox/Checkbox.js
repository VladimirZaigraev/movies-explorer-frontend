import React from 'react'
import './Checkbox.sass'

export const Checkbox = ({ short, setShort }) => {
  console.log('Checkbox', short)
  const hendelCkick = () => {
    setShort(short ? false : true)
  }
  return (
    <div className="checkbox">
      <input
        className="checkbox__input"
        id="short-film"
        type="checkbox"
        defaultChecked={!short}
        onClick={hendelCkick} />
      <label
        className="checkbox__label"
        htmlFor="short-film">
      </label>
    </div>
  )
}
