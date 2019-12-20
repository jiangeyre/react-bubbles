import React, { useState } from 'react';
import axios from 'axios';

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [login, setLogin] = useState(
    {
      username: '',
      password: ''
    }
  );

  const handleChanges = e => {
    setLogin({
      ...login,
      [e.target.name] : e.target.value
    });
    console.log(login);
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .post('http://localhost:5000/api/login', login)
      .then(res => {
        console.log(res);
        localStorage.setItem('token', res.data.payload);
        props.history.push('/private');
      })
      .catch(err => console.log(err));
  };

  return (
    <>
      <h1>BUBBLES!!!!!!!!!???!!</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type='text'
          name='username'
          value={login.username}
          onChange={handleChanges}
          placeholder='Username.'
        />
        <input 
          type='password'
          name='password'
          value={login.password}
          onChange={handleChanges}
          placeholder='Password.'
        />
        <button>Log in!</button>
      </form>
    </>
  );
};

export default Login;
