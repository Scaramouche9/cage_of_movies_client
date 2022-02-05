import React from 'react';
import { PropTypes } from 'prop-types';
import { Card, Button } from 'react-bootstrap';

import './movie-card.scss'

export class MovieCard extends React.Component {
  render() {
    const { movie, onMovieClick } = this.props;
    return (
      <Card>
        <Card.Img variant='top' src={movie.ImagePath} />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <Button onClick={() => onMovieClick(movie)}>Open</Button>
        </Card.Body>
      </Card>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Year: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Featured: PropTypes.bool.isRequired
  }).isRequired
}
