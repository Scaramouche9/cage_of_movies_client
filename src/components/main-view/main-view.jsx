import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';
import { DirectorView } from '../director-view/director-view'
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';

import './main-view.scss';
import { Navbar, Col, Button, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export class MainView extends React.Component {

  constructor() {
    super();
    // Initial state is set to null
    this.state = {
      movies: [],
      user: null
    };
  }

  getMovies(token) {
    axios.get('https://cage-of-movies.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  // When a user successfully logs in, this function updates the 'user' property in state to that user
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  // Deletes token when user selects the 'Logout' button
  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
  }

  render() {
    const { movies, user } = this.state;

    // If there is no user, the LoginView is rendered; otherwise, user details are passes as a prop to the LoginView
    return (
      <Router>
        <Navbar>
          <Navbar.Brand id='cage-logo'>
            <Link to={'/'}>
              Cage of Movies
            </Link>
          </Navbar.Brand>
          {user && (
            <Navbar.Collapse className='justify-content-end'>
              <Link to={`/users/${user}`} className='nav-button'>
                My Profile
              </Link>
              <Link to={`/`} onClick={() => this.onLoggedOut()} className='nav-button'>
                Logout
              </Link>
            </Navbar.Collapse>
          )}
        </Navbar>

        <Row className='main-view justify-content-md-center'>

          {/* Login view */}
          <Route exact path="/" render={() => {
            if (!user) return (
              < Col >
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </ Col >
            );

            // Movie-view shows if user is logged in
            if (movies.length === 0) return <div className='main-view movie__grid' />;

            return movies.map(m => (
              <Col md={3} key={m._id}>
                <MovieCard className='movie__grid--item' movie={m} />
              </Col>
            ))
          }}
          />

          {/*Single movie view*/}
          <Route path='/movies/:movieId' render={({ match, history }) => {
            if (!user)
              return
              <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>

            if (movies.length === 0) return <div className='main-view' />;
            return (
              <Col md={8}>
                <MovieView
                  movie={movies.find(m => m._id === match.params.movieID)}
                  user={user}
                  onBackClick={() => history.goBack()} />
              </Col>
            )
          }} />

          {/*Director view*/}
          <Route exact path='/directors/:name' render={({ match, history }) => {
            if (!user) return
            <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>

            if (movies.length === 0) return <div className='main-view' />; return (
            <Col md={8}>
              <DirectorView
                director={movies.find(m => m.Director.Name === match.params.name).Director}
                onBackClick={() => history.goBack()}
              />
              </Col>
            )
          }} />

          {/*Genre view*/}
          <Route exact path='/genres/:name' render={({ match, history }) => {
            if (!user) return
            <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>

            if (movies.length === 0) return <div className='main-view' />; return (
            <Col md={8}>
              <GenreView
                genre={movies.find(m => m.Genre.Name === match.params.name).Genre}
                onBackClick={() => history.goBack()}
              />
              </Col>
            )
          }} />

          {/*Profile view*/}
          <Route path='/users/${user}' render={({ history }) => {
            if (!user)
              return (
                <Col>
                  <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                </Col>
              );
            if (movies.length === 0) return <div className='main-view' />;
            return (
              <Col>
                <ProfileView
                  user={user}
                  movies={movies}
                  onBackClick={() => history.goBack()}/>
              </Col>
            )
          }} />

          {/*Registration view*/}
          <Route path='/register' render={() => {
            if (user) return <Redirect to="/" />
              return (
                <Col>
                  <RegistrationView />
                </Col>
              )
          }} />
        </Row>
      </Router>
    );
  }
} 