import React, { useState } from "react";
import { PropTypes } from 'prop-types';
import { Form, Button, Container, Row, Col, Card, CardGroup } from 'react-bootstrap';
import axios from "axios";

import './registration-view.scss';
export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [usernameErr, setUsernameErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [birthdayErr, setBirthdayErr] = useState('');

  const validate = () => {
    let isReq = true;
    if (!username) {
      setUsernameErr('Username Required');
      isReq = false;
    } else if (username.length < 8) {
      setUsernameErr('Username must be at least 8 characters long');
      isReq = false;
    }
    if (!password) {
      setPasswordErr('Password Required');
      isReq = false;
    } else if (password.length < 12) {
      setPasswordErr('Password must be at least 12 characters long');
      isReq = false;
    }
    if (!email) {
      setEmailErr('Please enter a valid email')
    } else if (email.indexOf('@') === -1) {
      setEmailErr('Please enter a valid email')
      isReq = false;
    }
    if (!birthday) {
      setBirthdayErr('Please enter birthday')
      isReq = false;
    }
    return isReq;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      console.log(username, password);
      axios.post('https://cage-of-movies.herokuapp.com/users', {
        username: username,
        password: password,
        email: email,
        birthday: birthday,
      })
        .then(response => {
          const data = response.data;
          console.log(data);
          props.onRegistered(data);
          window.open('/', '_self'); // opens in current tab 
        })
        .catch(e => {
          console.log('error registering this user')
        });
      props.onLoggedIn(username);
    }
};

  return (
    <Container>
      <Row>
        <Col>
          <CardGroup>
            <Card>
              <Card.Body>
                <Card.Title>Please Register</Card.Title>
                <Form>
                  <Form.Group>
                    <Form.Label>Username: </Form.Label>
                    <Form.Control
                      type='text'
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                      required
                      placeholder='Choose your username'/>
                      {usernameErr && <p>{usernameErr}</p>}
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Password: </Form.Label>
                    <Form.Control
                      type='password'
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      required
                      minLength='12'
                      placeholder='Choose a password with at least 12 characters' />
                      {passwordErr && <p>{passwordErr}</p>}
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Email: </Form.Label>
                    <Form.Control
                      type='text'
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                      placeholder='Enter a valid email' />
                      {emailErr && <p>{emailErr}</p>}
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Birthday: </Form.Label>
                    <Form.Control
                      type='text'
                      value={birthday}
                      onChange={e => setBirthday(e.target.value)}
                      required
                      placeholder='Enter your birthday' />
                      {birthdayErr && <p>{birthdayErr}</p>}
                  </Form.Group>
                  <Button type='submit' onClick={handleSubmit}>Submit</Button>
                </Form>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
);
}

RegistrationView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    birthday: PropTypes.string.isRequired,
  }),
  onRegistered: PropTypes.func.isRequired
};
