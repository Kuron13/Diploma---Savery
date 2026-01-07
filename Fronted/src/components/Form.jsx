import React from 'react';
import { useState } from 'react';

export function Form({ open, onClose, type }) {
  
  if (!open) return null;

  return (
    <div className='main-form'>
      <div className='form-header'>
        <div className='form-title'>{type == 'auth' ? 'Войти в аккаунт' : 'Регистрация'}</div> 
        <button className='btn-close' onClick={onClose}>X</button>
      </div>
      <div className='form-content'>
        {type == 'auth' ? <FormAuth /> : <FormReg />}
      </div>
    </div>
  )
}

function FormAuth() {

  const handleAuthorization = event => {
    event.preventDefault();
    console.log('Форма входа')
    console.log(event.currentTarget)
    const formEl = event.currentTarget;
    if (isValidForm(formEl)) {console.log('Добро пожаловать!')}
  };

  const [error, setError] = useState("");

  return (
    <div className='auth-form'>
      <form className="auth" onSubmit={handleAuthorization} noValidate>
        <label className='label-form'>
          Логин
          <input type="text" id="login-input" className="input" name="login" required pattern="[a-zA-Z0-9]" minLength="4" maxLength="20" />
        </label>
        <label className='label-form'>
          Пароль
          <input type="text" id="pass-input" className="input" name="password" required />
        </label>
        <button type='submit' className="btn-submit">Войти</button>
      </form>
    </div>
  )
}

function FormReg() {

  const handleRegistration = event => {
    event.preventDefault();
    console.log('Форма регистрации')
    console.log(event.currentTarget)
    const formEl = event.currentTarget;
    if (isValidForm(formEl)) {
      console.log('Вы приняты.')
    } else {
      console.log('Вы не прошли.')
    }
   
  };

  return (
    <div className='auth-form'>
      <form className="auth" onSubmit={handleRegistration} noValidate>
        <label className='label-form'>
          Логин
          <input type="text" id="login-input" className="input" name="login" required  pattern="[A-Za-z][A-Za-z\d]{3,19}" minlength="4" maxlength="20"  />
        </label>
        <label className='label-form'>
          Полное имя
          <input type="text" id="name-input" className="input" name="fullName" />
        </label>
        <label className='label-form'>
          Email
          <input type="text" type="email" id="mail-input" className="input" name="email" required />
        </label>
        <label className='label-form'>
          Пароль
          <input type="text" id="pass-input" className="input" name="password" required pattern="^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$" />
        </label>
        <button type='submit' className="btn-submit">Зарегегстрироваться</button>
      </form>   
    </div>
  )
}



function isValidForm(formEl) {

  const formData = {}
  let validStatus = true;

  //Массив выводящихся ошибок
  const errors = {
    "login": {
      valueMissing: 'Как к вам обращаться?',
      patternMismatch: 'Логин должен состоять из 4-20 символов и содержать только латинские буквы и цифры, начинаясь с буквы.',
      tooShort: 'Слишком коротко! Логин должен быть не меньше 4 символов.',
      tooLong: 'Слишком длинно! Логин должен быть не более 20 символов.',
      customError: 'Что-то пошло не так.'
    },
    "fullName": {
      valueMissing: 'Как к вам обращаться?',
      customError: 'Что-то пошло не так.'
    },
    "email": {
      valueMissing: 'Как с вами связаться?',
      typeMismatch: 'Это не похоже на почту',
      customError: 'Что-то пошло не так.'
    },
    "password": {
      valueMissing: 'Как вас защитить?',
      patternMismatch: 'Пароль должен содержать не менее 6 символов: как минимум одна заглавная буква, одна цифра и один специальный символ.',
      tooShort: 'Слишком коротко! Пароль должен быть не меньше 6 символов.',
      customError: 'Что-то пошло не так.'
    }
  };

  [...formEl.elements].forEach((el) => {
    if (!el.name) {
      return;
    }
    console.log('Поле: ', el, el.name, el.value)
    formData[el.name] = el.value
    
    const getError = (el) => {
      const errorKey = Object.keys(ValidityState.prototype).find((key) => {
        if (!el.name) return;
        if (key === 'valid') return;
        console.log(key, el.validity[key])
 
        return el.validity[key];
      });
      console.log('Тест наличия ошибки', errorKey)
      if (!errorKey) return;
      console.log('Тест после вывода ошибки')
      return errors[el.name][errorKey];
    };

    const error = getError(el);

    console.log('Ошибка', error);

    if (error != undefined) {
      validStatus = false;
    }

  });

  return (validStatus)
}