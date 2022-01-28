import React from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null
    };
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  render() {
    return (
      <div className='main-view'>
        <div>Pig</div>
        <div>Willy's Wonderland</div>
        <div>Prisoners of the Ghostland</div>
        <div>The Sorcerer's Apprentice</div>
        <div>Kick-Ass</div>
        <div>The Wicker Man</div>
        <div>The Weather Man</div>
        <div>National Treasure</div>
        <div>Matchstick Men</div>
        <div>Wild at Heart</div>
        <div>Raising Arizona</div>
      </div>
    );
  }

  render() {
    const { movies, selectedMovie } = this.state;
    if (movies.length === 0) return <div className='main-view'>The list is empty!</div>;
      return (
        <div className='main-view'>
          {selectedMovie
            ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => {
              this.setSelectedMovie(newSelectedMovie);
            }} />
            : movies.map(movie => (
              <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }} />
            ))
          }
        </div>
      );
  }
}
