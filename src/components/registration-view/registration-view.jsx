import React, { useState } from "react";
import { PropTypes } from 'prop-types';
import { Form, Button, Container, Row, Col, Card, CardGroup } from 'react-bootstrap';

import './registration-view.scss';
export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('')

const handleSubmit = (e) => {
  e.preventDefault();
  console.log(username, email, password, birthday);
  // Send a request to the server for authentication
  // Then call props.onRegistered(username)
  props.onRegistered(username);
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
                    <Form.Control type='text' value={username} onChange={e => setUsername(e.target.value)} placeholder='Enter username'/>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Password: </Form.Label>
                    <Form.Control type='text' value={password} onChange={e => setPassword(e.target.value)} placeholder='Choose a password'/>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Email: </Form.Label>
                    <Form.Control type='text' value={email} onChange={e => setEmail(e.target.value)} placeholder='Enter a valid email'/>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Birthday: </Form.Label>
                    <Form.Control type='text' value={birthday} onChange={e => setBirthday(e.target.value)} placeholder='Enter birthday'/>
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
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  birthday: PropTypes.string.isRequired,
  onRegistration: PropTypes.func.isRequired
};