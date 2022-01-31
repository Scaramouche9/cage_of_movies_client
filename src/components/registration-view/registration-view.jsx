import React, { useState } from "react";
import PropTypes from 'prop-types';

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [birthday, setBirthday] = useState('')

const handleSubmit = (e) => {
  e.preventDefault();
  console.log(username, email, password, birthday);
  // Send a request to the server for authentication
  // Then call props.onRegistered(username)
  props.onRegistered(username);
};

return (
  <form>
    <label>
      Username:
      <input type='text' value={username} onChange={e => setUsername(e.target.value)} />
    </label>
    <label>
      Email:
      <input type='text' value={email} onChange={e => setEmail(e.target.value)} />
    </label>
    <label>
      Password:
      <input type='text' value={password} onChange={e => setPassword(e.target.value)} />
    </label>
    <label>
      Birthday:
      <input type='date' value={birthday} onChange={e => setBirthday(e.target.value)} />
    </label>
    <button type="submit" onClick={handleSubmit}>Submit</button>
  </form>
);
}

RegistrationView.propTypes = {
  username: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  birthday: PropTypes.string.isRequired,
  onRegistration: PropTypes.func.isRequired
};