import { useState, useEffect } from 'react';
import { MAIL_REGEX, NAME_REGEX } from '../config/config';

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
            if (value.length < validations[validation]) {
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
          if (value.length > 3) {
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

  return {
    minLengthErrorMessage,
    emailErrorMessage,
    nameErrorMessage,
    minLengthError,
    nameError,
    emailError
  }
}