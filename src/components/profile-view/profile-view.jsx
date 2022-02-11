import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Button, Card, Form, Container } from 'react-bootstrap';

import './profile-view.scss';

export class ProfileView extends React.Component {
  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    this.getUserDetails(accessToken);
  }

  render() {
    const { movies, onBackClick } = this.props;
    
    return (
      <Container>
        <Card>
          <Card.Body>
            <Card.Title>My Profile</Card.Title>
            <Card.Text>
              <span>Email: </span>
              <span>Birthday: </span>
            </Card.Text>
          </Card.Body>
        </Card>
        <Card>
          <Card.Body>
            <Card.Title>Update Profile Details</Card.Title>
            <Form>
              <Form.Group>
                <Form.Label>Update Username</Form.Label>
              </Form.Group>
              <Form.Group>
                <Form.Label>Update Password</Form.Label>
              </Form.Group>
              <Form.Group>
                <Form.Label>Update Email</Form.Label>
              </Form.Group>
              <Form.Group>
                <Form.Label>Update Birthday</Form.Label>
              </Form.Group>
            </Form>
            <Button onClick={() => onBackClick(null)}>Back</Button>
          </Card.Body>
        </Card>
      </Container>
    )
  }
}

ProfileView.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      Favorite: PropTypes.string
    })
  ),
  onBackClick: PropTypes.func.isRequired
};