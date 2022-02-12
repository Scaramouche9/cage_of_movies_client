import React, { useState } from "react";
import axios from 'axios';
import { PropTypes } from 'prop-types';
import { Form, Button, Container, Row, Col, Card, CardGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './login-view.scss';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameErr, setUsernameErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');

  const validate = () => {
    let isReq = true;
    if (!username) {
      setUsernameErr('Username required');
      isReq = false;
    } else if (username.length < 8) {
      setUsernameErr('Username must be at least 8 characters long');
      isReq = false;
    }
    if (!password) {
      setPasswordErr('Password required');
      isReq = false;
    } else if (password.length < 12) {
      setPasswordErr('Password must be at least 12 characters long');
      isReq = false;
    }
    return isReq;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if(isReq) {
    // Send a request to the server for authentication
    axios.post(`https://cage-of-movies.herokuapp.com/login`, {
      Username: username,
      Password: password
    })
      .then(response => {
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch(e => {
        console.log('no such user')
      });
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <CardGroup>
            <Card id='login-card'>
              <Card.Body>
                <Card.Title>To enter the Cage of Movies, please login: </Card.Title>
                <Form>
                  <Form.Group controlId="formUsername">
                    <Form.Label>Username: </Form.Label>
                    <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
                  </Form.Group>
                  <Form.Group controlId="formPassword">
                    <Form.Label>Password: </Form.Label>
                    <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
                  </Form.Group>
                  <Button variant="primary" type="submit" onClick={handleSubmit}>Submit</Button>
                </Form>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card id='register-card'>
                <Card.Body>
                  <Card.Title>Dont' Have an Account?</Card.Title>
                  <Link to={`/register`}>
                    <Button>Register Here</Button>
                  </Link>
              </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

LoginView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
  }),
  onLoggedIn: PropTypes.func.isRequired
};