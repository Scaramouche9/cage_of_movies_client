import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Button, Card, Form, Container, Modal } from 'react-bootstrap';

import { MovieCard } from '../movie-card/movie-card';

import './profile-view.scss';

export class ProfileView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userDetails: [],
      validated: false,
      Username: '',
      Password: '',
      Email: '',
      Birthday: '',
      Favorites: [],
      modalState: false
    }

    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.updateUserDetails = this.updateUserDetails.bind(this);
    this.showModal = this.showModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.deleteUserDetails = this.deleteUserDetails.bind(this);
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    this.getUserDetails(accessToken);
  }

  getUserDetails(token) {
    axios.get(`https://cage-of-movies.herokuapp.com/users/${this.props.user}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(response => {
      this.setState({
        userDetails: response.data,
        Favorites: response.data.Favorites
      });
    }).catch(function (error) {
      console.log(error);
    });
  };

  updateUserDetails(e) {
    const form = e.currentTarget.parentNode;
    let token = localStorage.getItem('token');
    let user = localStorage.getItem('user');
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      this.setState({ validated: true });
    } else {
      e.preventDefault();
      this.setState({ validated: true });
      axios.put(`https://cage-of-movies.herokuapp.com/users/${user}`, {
        Username: this.state.Username,
        Password: this.state.Password,
        Email: this.state.Email,
        Birthday: this.state.Birthday
      }, {
        headers: { Authorization: `Bearer ${token}` }
      }).then(response => {
        const data = response.data;

        // Update username in local storage
        localStorage.setItem('user', data.Username);

        // Reload page so user's new details take effect immediately
        window.open(`/users/${data.Username}`, '_self');
      }).catch(error => {
        console.log('error updating user details')
      });
    }
  };

  handleFieldChange(event) {
    let { name, value } = event.target;
    this.setState({ [name]: value})
  }

  // Modal confirming user wants to delete profile
  showModal() {
    this.setState({ modalState: true });
  }

  // Closes modal
  closeModal() {
    this.setState({ modalState: false });
  }

  deleteUserDetails() {
    let token = localStorage.getItem('token');
    let user = localStorage.getItem('user');
    axios.delete(`https://cage-of-movies.herokuapp.com/users/${user}`, {
      headers: {Authorization: `Bearer ${token}`}
    }).then(response => {
      const data = response.data;
      alert(user + 'has been deleted');

      // Remove user details and auth token from localStorage, redirect to login page
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      window.open('/', '_self');
    }).catch(error => {
      console.log('Unable to delete user');
    })
  }

  render() {
    const { movie, onBackClick } = this.props;

    let tempArray = this.state.Favorites;
    let FavoritesArray = [];
    FavoritesArray = movie.filter(movie => tempArray.includes(movie._id));

    return (
      <Container className='profile-view'>

        {/* Modal pops up when user requests to delete profile */}
        <Modal show={this.state.modalState} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Are you sure you want to delete your profile?</Modal.Title>
          </Modal.Header>
          <Modal.Body>Deleting a user profile is irreversible. Please confirm that you wish to do so.</Modal.Body>
          <Modal.Footer>
            <Button onClick={this.deleteUserDetails}></Button>
            <Button variant='danger' onClick={this.deleteUserDetails}></Button>
          </Modal.Footer>
        </Modal>

        {/* Current user profile */}
        <Card>
          <Card.Body>
            <Card.Title>My Profile</Card.Title>
            <Card.Text><span className='profile-item'>Email: </span>{this.state.userDetails.Email}</Card.Text>
            <Card.Text><span className='profile-item'>Birthday: </span>{this.state.userDetails.Birthday}</Card.Text>
          </Card.Body>
        </Card>

        {/* Form to update user profile */}
        <Card>
          <Card.Body>
            <Card.Title>Update Profile Details</Card.Title>
            <Form noValidate validated={this.state.validated}>
              <Form.Group>
                <Form.Label>Username: </Form.Label>
                <Form.Control name='Username' type='text' onChange={this.handleFieldChange} required />
                <Form.Control.Feedback type='invalid'>Please enter a username with 8 or more characters</Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Label>Password: </Form.Label>
                <Form.Control name='Password' type='password' onChange={this.handleFieldChange} required />
                <Form.Control.Feedback type= 'invalid'>Please enter a password with 12 or more characters</Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Label>Email: </Form.Label>
                <Form.Control name='Email' type='email' onChange={this.handleFieldChange} required />
                <Form.Control.Feedback type='invalid'>Please enter a valid email address</Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Label>Birthday:</Form.Label>
                <Form.Control name='Birthday' type='date' onChange={this.handleFieldChange} />
                <Form.Control.Feedback type='invalid'>Please enter a valid date</Form.Control.Feedback>
              </Form.Group>
              <Button type='submit' onClick={this.updateUserDetails}>Confirm Changes</Button>
              <Button onClick={() => onBackClick(null)}>Back</Button>
              <Button onClick={this.showModal}>Delete My Profile</Button>
            </Form>
          </Card.Body>
        </Card>

        {/* User favorite movies */}
        <Card>
          <Card.Title>{this.state.userDetails.Username}'s Favorite Movies: </Card.Title>
          <Row>
            {FavoritesArray.map(movie => (
              <Col key={movie._id}>
                <MovieCard movie={movie} />
              </Col>
            ))}
          </Row>
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