import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Container, Card, Button} from 'react-bootstrap';

import './director-view.scss'

export class DirectorView extends React.Component {
  render() {
    const { director, onDirectorClick } = this.props;
    return (
      <Container>
        <Card>
          <Card.Body>
            <Card.Title>Director</Card.Title>
            <div>
              <span className='label'>Name: </span>
              <span className='value'>{director.name}</span>
            </div>
            <div>
              <span className='label'>Bio: </span>
              <span className='value'>{director.bio}</span>
            </div>
            <div>
              <span className='label'>Born: </span>
              <span className='value'>{director.birthyear}</span>
            </div>
            <div>
              <span className='label'>Died: </span>
              <span className='value'>{director.deathyear}</span>
            </div>
            <Link to={`/`}>
              <Button onClick={() => { onBackClick(null); }}>Back</Button>
            </Link>
          </Card.Body>
        </Card> 
      </Container >
    );
  }
}

DirectorView.propTypes = {
  Director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired,
    BirthYear: PropTypes.string.isRequired,
    DeathYear: PropTypes.string.isRequired
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};