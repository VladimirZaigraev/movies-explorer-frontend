import { useState, useEffect } from 'react'

export const useValidation = (value, validations) => {

  const [minLengthError, setMinLengthError] = useState(false)
  const [minLengthErrorMessage, setMinLengthErrorMessage] = useState('')

  const [emailError, setEmailError] = useState(false)
  const [emailErrorMessage, setEmailErrorMessage] = useState('')

  const [nameError, setNameError] = useState(false)
  const [nameErrorMessage, setNameErrorMessage] = useState('')

  useEffect(() => {
    for (const validation in validations) {
      switch (validation) {
        case 'minLength':
          if (value.length > 0) {
            if (value.length <= validations[validation]) {
              setMinLengthError(false)
              setMinLengthErrorMessage(`Введите больше символов. Минимальное значение ${validations[validation]}`)
            } else {
              setMinLengthError(true)
              setMinLengthErrorMessage('')
            }
          } else {
            setMinLengthError(false)
            setMinLengthErrorMessage('')
          }
          break;
        case 'isEmail':
          const MAIL_REGEX = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          if (value.length >= 3) {
            if (MAIL_REGEX.test(String(value).toLowerCase())) {
              setEmailErrorMessage('')
              setEmailError(true)
            } else {
              setEmailErrorMessage('Email внесен не корреткно')
              setEmailError(false)
            }
          } else {
            setEmailErrorMessage('')
            setEmailError(false)
          }
          break;
        case 'isName':
          const NAME_REGEX = /^[a-zA-Zа-яА-Я\-\ ]+$/;
          if (value.length > 3) {
            if (NAME_REGEX.test(String(value).toLowerCase())) {
              setNameErrorMessage('')
              setNameError(true)
            } else {
              setNameErrorMessage('Имя может содержать только латиницу, кириллицу, пробел или дефис')
              setNameError(false)
            }
          } else {
            setNameErrorMessage('')
            setNameError(false)
          }
      }
    }
  }, [value]);
  // console.log('minLengthError', minLengthError)
  // console.log('nameError', nameError)
  // console.log('emailError', emailError)

  return {
    minLengthErrorMessage,
    emailErrorMessage,
    nameErrorMessage,
    minLengthError,
    nameError,
    emailError
  }
}