import React from 'react';
import axios from 'axios';

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

import { Row, Col } from 'react-bootstrap/Row';
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
  onLoggedIn(user) {
    this.setState({
      user
    });
  }

  render() {
    const { movies, selectedMovie } = this.state;

    // If there is no user, the LoginView is rendered; otherwise, user details are passes as a prop to the LoginView
    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

    // Before the movies have been loaded
    if (movies.length === 0) return <div className='main-view'/>;
      return (
        <Row className='main-view justify-content-md-center'>
          {selectedMovie
            ? (
                <Col md={8}>
                  // If state of 'selectedMovie' is not null, selected movie will be returned; otherwise, all movies will be returned
                  <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => {
                    this.setSelectedMovie(newSelectedMovie);
                }} />
                </Col>
            )
            : movies.map(movie => (
                  <Col md={3} key={movie._id}>
                    <MovieCard
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
  }
}
