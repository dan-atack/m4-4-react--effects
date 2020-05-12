import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import useInterval from '../hooks/use-interval.hook';

import GlobalStyles from './GlobalStyles';
import { GameContext, GameProvider } from './GameContext';
import Home from './Home';
import Game from './Game';

function App() {

  const { numCookies, setNumCookies, cookiesPerSecond, lastTime, setLastTime } = React.useContext(GameContext);

  // Effect for passive cookie generation, now converted to time updater for Cookie production based on delta time (See below):

  useInterval(() => {
    // setup for absentee cookie production (now the ONLY form of cookie production):
    setLastTime((new Date).getTime());
  }, 1000);

  // Effect for absentee cookie production:

  React.useEffect(() => {

    const currentTime = (new Date).getTime();
    const deltaT = (Math.ceil((currentTime-lastTime)/1000));
    setNumCookies(numCookies+(deltaT*cookiesPerSecond));
    // I feel like I should do some 'tidy-up' return statement here, but I'm not sure what to put in it!

  }, [lastTime]);

  return (
    <>
        <GlobalStyles />
          <Router>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/game">
              <Game
              />
            </Route>
          </Router>
    </>
  );
}

export default App;
