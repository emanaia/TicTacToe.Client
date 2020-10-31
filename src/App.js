import React from 'react';
import Home from './components/Home';
import { GameProvider } from './contexts/GameContext';

function App() {

  const colors = ['#e9e9e9', '#eee'];
  function MudarCor(option) {
    setTimeout(() => {
      document.body.style.backgroundColor = colors[option];

      if (option === (colors.length - 1)) {
        MudarCor(0);

      } else {
        MudarCor(++option);
      }
    }, 5000);
  }
  window.onload = MudarCor(0);

  return (

    <GameProvider>
      <Home />
    </GameProvider>
  );

}

export default App;
