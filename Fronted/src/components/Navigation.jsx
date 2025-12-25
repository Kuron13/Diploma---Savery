import React from 'react';
import { useState } from 'react';

import { Form } from './Form.jsx'


export function Navigation() {

  const [openForm, setOpenForm] = useState(false);
  const [typeForm, setTypeForm] = useState('auth');
  
  const openModalForm = (type) => {
    setTypeForm(type);
    setOpenForm(true);
  };
  const closeModalForm = () => setOpenForm(false);


  return (
    <div className='navigation-block'>
      <div className='main-name'> Savery </div>
      <div className='buttons-auth'>
        <button onClick={() => openModalForm('auth')} className='btn-auth'> Вход </button>
        /
        <button onClick={() => openModalForm('reg')} className='btn-auth'> Регистрация </button>
      </div>
      {openForm && < Form open={openForm} onClose={closeModalForm} type={typeForm} />}
    </div>
  )
}