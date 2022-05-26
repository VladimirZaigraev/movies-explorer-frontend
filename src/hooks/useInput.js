import { useState } from 'react'

export const useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue)
  const [isDirty, setDirty] = useState(false)

  const onChange = (event) => {
    setValue(event.target.value)
  }
  const onBlur = () => {
    setDirty(true)
  }

  return {
    value,
    setValue,
    onChange,
    onBlur,
    isDirty
  }
}