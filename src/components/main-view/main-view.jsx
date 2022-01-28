import React from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export default class MainView extends React.Component {
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
}