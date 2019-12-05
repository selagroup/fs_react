import React from 'react';
import './App.css';
import AppHeader from './components/AppHeader/AppHeader';
import MoviesContainer from './components/MoviesContainer';

const App: React.FC = () => {
  return (
    <div className="App">
      <AppHeader></AppHeader>
      <section  className="App-content">
        <MoviesContainer>

        </MoviesContainer>
      </section>  
    </div>
  );
}

export default App;
