import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Redirect, Routes } from 'react-router-dom';

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';
import { DirectorView } from '../director-view/director-view'
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';

import './main-view.scss';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
export class MainView extends React.Component {
  constructor() {
    super();
    // Initial state is set to null
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null
    };
  }

  componentDidMount() {
    axios.get('https://cage-of-movies.herokuapp.com/movies')
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  // When a movie is clicked, this function is invoked and updates the state of the 'selectedMovie' property to that movie
  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
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

  render() {
    const { movies, selectedMovie, user } = this.state;

    // If there is no user, the LoginView is rendered; otherwise, user details are passes as a prop to the LoginView
    if (!user) {
      return (
        < Row >
          <Col>
            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
          </Col>
        </ Row >
      );
    }

    // Before the movies have been loaded
    if (movies.length === 0) return <div className='main-view movie__grid'/>;
      return (
        <Row className='main-view justify-content-md-center'>
          {selectedMovie
            ? (
                <Col md={8}>
                  <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => {
                    this.setSelectedMovie(newSelectedMovie);
                }} />
          // Director view
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

          // Genre view
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

          // Profile view
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
            : movies.map(movie => (
                  <Col md={3} key={movie._id}>
                    <MovieCard
                      className='movie__grid--item'
                      movie={movie}
                      onMovieClick={(newSelectedMovie) => {
                        this.setSelectedMovie(newSelectedMovie);
                      }}
                    />
                  </Col>
            ))
          }
        </Row>
      );
          }} />

          // Registration view
          <Route path='/register' render={() => {
            if (user) return <Redirect to="/" />
              return (
                <Col>
                  <RegistrationView />
                </Col>
              )
          }} />
        </Routes>
      </Router>
    );
  }
} 