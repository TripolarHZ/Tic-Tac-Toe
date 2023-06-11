import React, { useState,} from 'react';

const COHORT_NAME = '2303-ftb-et-web-pt';
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;

const Register = () =>{
  const [username, setUsername] = useState([]);
  const [password, setPassword] = useState([]);
    const registerUser = async (ev) => {
        ev.preventDefault();
        try {
          const response = await fetch(
            `${BASE_URL}/users/register`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              user: {
                username: username,
                password: password
              }
            })
          });
          const result = await response.json();
          console.log(result)
          setUsername('');
          setPassword('');
        } catch (err) {
          console.error(err);
        }
      }
      
    return <>
    <h1>Sign Up</h1>
    <form onSubmit={registerUser}>
        <input type='text' placeholder='Username*' value={username} onChange=
        {(ev) => setUsername(ev.target.value)}></input>
        <input type='password' placeholder='Password*' value={password} onChange=
        {(ev) => setPassword(ev.target.value)}></input>
        <button type="submit" className="btn btn-outline-primary">SIGN UP</button>
    </form>
    </>
}

export default Register;