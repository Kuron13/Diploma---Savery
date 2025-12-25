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
    console.log('Добро пожаловать!')
    console.log(event.currentTarget)
  };

  const [error, setError] = useState("");

  return (
    <div className='auth-form'>
      <form className="auth" onSubmit={handleAuthorization}>
        <label className='label-form'>
          Логин
          <input type="text" id="login-input" className="input" />
        </label>
        <label className='label-form'>
          Пароль
          <input type="text" id="pass-input" className="input" />
        </label>
        <button type='submit' className="btn-submit">Войти</button>
      </form>
    </div>
  )
}

function FormReg() {

  const handleRegistration = event => {
    event.preventDefault();
    console.log('Вы приняты.')
    console.log(event.currentTarget)
  };

  return (
    <div className='auth-form'>
      <form className="auth" onSubmit={handleRegistration}>
        <label className='label-form'>
          Логин
          <input type="text" id="login-input" className="input" />
        </label>
        <label className='label-form'>
          Полное имя
          <input type="text" id="name-input" className="input" />
        </label>
        <label className='label-form'>
          Email
          <input type="text" id="mail-input" className="input" />
        </label>
        <label className='label-form'>
          Пароль
          <input type="text" id="pass-input" className="input" />
        </label>
        <button type='submit' className="btn-submit">Зарегегстрироваться</button>
      </form>   
    </div>
  )
}



    