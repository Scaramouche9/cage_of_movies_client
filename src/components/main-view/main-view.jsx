import React from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [
        { _id: 1, Title: 'Pig', Description: 'A truffle hunter who lives alone in the Oregonian wilderness must return to his past in Portland in search of his beloved foraging pig after she is kidnapped.', ImagePath: 'https://via.placeholder.com/150' },
        { _id: 2, Title: 'Willy\'s Wonderland', Description: 'A quiet drifter in tricked into a janitorial job and the now condemned Willy\'s Wonderland.', ImagePath: 'https://via.placeholder.com/150' },
        { _id: 3, Title: 'Prisoners of the Ghostland', Description: 'In the treacherous frontier city of Samurai Town, a ruthless bank robber gets sprung from jail by a wealthy warlord whose adopted granddaughter has gone missing.', ImagePath: 'https://via.placeholder.com/150' },
        { _id: 4, Title: 'The Sorcerer\'s Apprentice', Description: 'The sorcerer Balthazar takes on a young apprentice, believing him to be the wizard prophesied to finally destroy the evil sorceress Morgana.', ImagePath: 'https://via.placeholder.com/150' },
        { _id: 5, Title: 'Kick-Ass', Description: 'Dave Lizewski is an unnoticed high school student and comic book fan who one day decides to become a superhero, even though he has no powers.', ImagePath: 'https://via.placeholder.com/150' },
        { _id: 6, Title: 'The Wicker Man', Description: 'A reclusive lawman travels to a secluded island to search for a girl who has gone missing, discovering siniester forces at work among the island\'s secretive residents.', ImagePath: 'https://via.placeholder.com/150' },
        { _id: 7, Title: 'The Weather Man', Description: 'David Spritz is a Chicago weatherman who, despite his success at his job, is deeply unhappy.', ImagePath: 'https://via.placeholder.com/150' },
        { _id: 8, Title: 'National Treasure', Description: 'A historian and descendant of a family of fortune hunters races to find the legendary Templar treasure before a team of mercenaries.', ImagePath: 'https://via.placeholder.com/150' },
        { _id: 9, Title: 'Matchstick Men', Description: 'A phobic con artist and his protege are on the verge of pulling off a lucrative swindle when the former\'s teenage daughter arrives unexpectedly.', ImagePath: 'https://via.placeholder.com/150' },
        { _id: 10, Title: 'Wild at Heart', Description: 'Young lovers Sailor and Lula run from the variety of weirdos that Lula\'s mom has hired to kill Sailor.', ImagePath: 'https://via.placeholder.com/150' },
        { _id: 11, Title: 'Raising Arizona', Description: 'Fast-paced farce about an unlikely pair who go to extreme lengths to have a child', ImagePath: 'https://via.placeholder.com/150' },
      ],
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
