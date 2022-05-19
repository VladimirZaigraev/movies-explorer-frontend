import React, { useState, useEffect } from 'react'

export const useValidation = (value, validations) => {

  const [minLengthError, setMinLengthError] = useState(false)
  const [minLengthErrorMessage, setMinLengthErrorMessage] = useState('')

  const [emailError, setEmailError] = useState(false)
  const [emailErrorMessage, setEmailErrorMessage] = useState('')

  const [nameError, setNameError] = useState(false)
  const [nameErrorMessage, setNameErrorMessage] = useState('')

  const [isValid, setValid] = useState(false)

  useEffect(() => {
    for (const validation in validations) {
      // console.log(validation)
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
          const MAIL_REGEX = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          // console.log(value)
          if (value.length > 3) {
            if (MAIL_REGEX.test(String(value).toLowerCase())) {
              // console.log('test string', re.test(String(value).toLowerCase()))
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

  useEffect(() => {
    if (minLengthError || emailError || nameError) {
      setValid(true)
    } else {
      setValid(false)
    }
  }, [minLengthError, emailError, nameError])
  // console.log('isValid', isValid)

  return {
    minLengthErrorMessage,
    emailErrorMessage,
    nameErrorMessage,
    isValid
  }
}