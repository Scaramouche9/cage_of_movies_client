import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Container } from 'react-bootstrap';
import PropTypes from 'prop-types';

import './genre-view.scss';

export class GenreView extends React.Component {
  render() {
    const { Genre, onBackClick, movies } = this.props;
    return (
      <Container>
        <Card>
          <Card.Title>Genre</Card.Title>
          <div className='genre-name'>
            <span className='label'>Name: </span>
            <span className='value'>{Genre.name}</span>
          </div>
          <div className='genre-description'>
            <span className='label'>Description: </span>
            <span className='value'>{Genre.description}</span>
          </div>
          <Link to={`/`}>
            <Button onClick={() => onBackClick(null)}>Back</Button>
          </Link>
        </Card>
      </Container>
    )
  }
}

GenreView.propTypes = {
  genre: PropTypes.shape({
    Name: PropTypes.string,
    Description: PropTypes.string
  }),
  onBackClick: PropTypes.func.isRequired
};