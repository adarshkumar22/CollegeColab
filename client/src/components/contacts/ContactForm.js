import React, { useState, useEffect } from 'react';
import {
  addContact,
  useContacts,
  updateContact,
  clearCurrent
} from '../../context/contact/ContactState';

const initialContact = {
  name: '',
  email: '',
  phone: '',
  type: 'personal',
  description: '',
  likes: [],
  completed: 'notcompleted'
};

const ContactForm = () => {
  const [contactState, contactDispatch] = useContacts();

  const { current } = contactState;

  const [contact, setContact] = useState(initialContact);

  useEffect(() => {
    if (current !== null) {
      setContact(current);
    } else {
      setContact(initialContact);
    }
  }, [current]);

  const { name, email, phone, type, description, completed } = contact;

  const onChange = (e) =>
    setContact({ ...contact, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (current === null) {
      addContact(contactDispatch, contact).then(() =>
        setContact(initialContact)
      );
    } else {
      updateContact(contactDispatch, contact);
    }
    clearAll();
  };

  const clearAll = () => {
    clearCurrent(contactDispatch);
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-primary'>
        {current ? 'Edit Post' : 'Add Post'}
      </h2>
      <input
        type='text'
        placeholder='Title'
        name='name'
        value={name}
        onChange={onChange}
      />
      <input
        type='text'
        placeholder='Eligibility'
        name='email'
        value={email}
        onChange={onChange}
      />
      <input
        type='text'
        placeholder='Apply Link'
        name='phone'
        value={phone}
        onChange={onChange}
      />
      <input
        type='text'
        placeholder='Description'
        name='description'
        value={description}
        onChange={onChange}
      />
      <h5>Type</h5>
      <input
        type='radio'
        name='type'
        value='personal'
        checked={type === 'personal'}
        onChange={onChange}
      />{' '}
      Project{' '}
      <input
        type='radio'
        name='type'
        value='professional'
        checked={type === 'professional'}
        onChange={onChange}
      />{' '}
      Research Paper


      {
        type === 'personal' ? <h5>Project Status</h5> : <h5>Research Paper Status</h5>
      }
      <input
        type='radio'
        name='completed'
        value='notcompleted'
        checked={completed === 'notcompleted'}
        onChange={onChange}
      />{' '}
      Ongoing{' '}
      <input
        type='radio'
        name='completed'
        value='yescompleted'
        checked={completed === 'yescompleted'}
        onChange={onChange}
      />{' '}
      Completed


      <div>
        <input
          type='submit'
          value={current ? 'Update Post' : 'Add Post'}
          className='btn btn-primary btn-block'
        />
      </div>
      {current && (
        <div>
          <button className='btn btn-light btn-block' onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default ContactForm;
