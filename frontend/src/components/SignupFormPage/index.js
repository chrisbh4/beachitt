import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import '../SignupFormPage/SignupForm.css';

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      const data = await dispatch(sessionActions.signup({ email, username, password }))

      debugger
      if(data.errors){
        console.log(data.errors)
        setErrors(data.errors)
        return data.errors
      }
      return data
        // .catch(async (res) => {
        //   const data = await res.json();
        //   if (data && data.errors) setErrors(data.errors);
        // });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  const displayErrors = () =>{

    if(errors.length){
      return (
        <div  id='signup-errors-div' class='overflow-y-auto'>
        <ul>
          {errors.map((error, idx) => <p key={idx}>{error}</p>)}
        </ul>
        </div>
      )
    }else{
      return(
        <>
        </>
      )
    }
  }

  return (
    <form
    className="signup-form"
    onSubmit={handleSubmit}>

      <div className="signup-div">

      {displayErrors()}

      <label>
        Email:
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          />
      </label>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          />
      </label>
      <label>
        Confirm Password:
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          />
      </label>
      <button
          type="submit"
          className="signup-submit"

        >Sign Up</button>
          </div>
    </form>
  );
}

export default SignupFormPage;
