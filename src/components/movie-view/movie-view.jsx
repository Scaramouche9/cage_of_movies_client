import React from 'react';
import { PropTypes } from 'prop-types';

// SCSS Import
import './movie-view.scss'

// React Bootstrap Import
import { Container, Row, Col, Button } from 'react-bootstrap';
export class MovieView extends React.Component {
  render() {
    const { movie, onBackClick } = this.props;
    return (
      <Container className='moviesContainer'>
        <Row>
          <Col>
            <div className='movie-view justify-content-md-center'>
              <div className='movie-poster'>
                <img src={movie.ImagePath} crossOrigin='anonymous' />
              </div>
            </div>
          </Col>
          <Col>
            <div className='movie-view justify-content-md-center'>
              <div className='movie-text-info'>
                <div className='movie-title'>
                  <span className='label'>Title: </span>
                  <span className='value'>{movie.Title}</span>
                </div>
                <div className='movie-year'>
                  <span className='label'>Year: </span>
                  <span className='value'>{movie.Year}</span>
                </div>
                <div className='movie-rating'>
                  <span className='label'>Rating: </span>
                  <span className='value'>{movie.Rating}</span>
                </div>
                <div className='movie-genre'>
                  <span className='label'>Genre: </span>
                  <span className='value'>{movie.Genre.Name}</span>
                </div>
                <div className='movie-director'>
                  <span className='label'>Director: </span>
                  <span className='value'>{movie.Director.Name}</span>
                </div>
                <div className='movie-description'>
                  <span className='label'>Description: </span>
                  <span className='value'>{movie.Description}</span>
                </div>
              </div>
              <Button className='movie-view-btn' onClick={() => { onBackClick(null); }}>Back</Button>
            </div>
              </Col>
        </Row>
      </Container>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired
    }).isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birthdate: PropTypes.string.isRequired,
      Deathdate: PropTypes.string.isRequired
    }).isRequired,
    Year: PropTypes.string.isRequired,
    Rating: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Featured: PropTypes.bool.isRequired
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};