import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import '../LoginFormPage/LoginForm.css';

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const history = useHistory();

  if (sessionUser) return (
    <Redirect to="/" />
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    // return dispatch(sessionActions.login({ credential, password }))
    //   .catch(async (res) => {
    //     const data = await res.json();
    //     if (data && data.errors) setErrors(data.errors);
    //   });

    const data = await dispatch(sessionActions.login({ credential, password }))

      if(data.status == 401){
        setErrors([...errors,"Email or Password was invalid."])
      }

    console.log(data)
    if(data.errors) setErrors([...data.errors])
    history.push('/units')

    return data
  }

  return (
    <form onSubmit={handleSubmit} class='p-5' id='blanch-bg'>
      <div className="login-container">


        <div id='login-errors'>
          <ul>
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
          </ul>
        </div>

<div class='flex'>
      <label className="login-label">
        Username or Email
        <input
          class='w-1/2 ml-2'
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
          />
      </label>
      <label className="login-label">
        Password
        <input
        class='w-1/2 ml-2'
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        />
      </label>
      <button
        type="submit"
        class='relative right-4'
        >Log In</button>
          </div>
        </div>
    </form>
  );
}

export default LoginFormPage;
