import React from 'react';
import usePersistedState from '../hooks/use-persisted-state.hook';

// Create game context, with null as starting value:
export const GameContext = React.createContext(null);

// Create game provider to deploy the context to the parts of the app that need it:
// Notice that this is wrapped up in a function so we can import parts of the context in lieu of props wherever it is needed.
// The 'children' object parameter refers to the component/s that will be wrapped inside this context provider. Like in the 
// lecture examples, we give components access to context by embedding them inside the provider:
export const GameProvider = ({ children }) => {
// Our context provider is set up to hold all of the variables that are considered 'global' values;
// This includes all of the various states and their 'set' methods:

    const [numCookies, setNumCookies] = usePersistedState("numCookies", 100);

    const [purchasedItems, setPurchasedItems] = usePersistedState("purchasedItems", {
    cursor: 0,
    grandma: 0,
    farm: 0,
    complex: 0,
    });

    // A highly ambitious and likely foolhardy attempt to keep your cookies generating while away:

    const [lastTime, setLastTime] = usePersistedState("lastTime", 0);

    const cookieCalculator = factorsOfProduction => {
        return (   
            (factorsOfProduction.cursor + (factorsOfProduction.grandma * 10) + (factorsOfProduction.farm * 80) + (factorsOfProduction.complex * 750))
        )
    };
    // The return statement spits out all of the context values; sort of a universal super-props list that different components
    // can 'hook' into as needed:
    return (
        <GameContext.Provider
        value={{ 
            numCookies, 
            setNumCookies, 
            purchasedItems, 
            setPurchasedItems,
            cookiesPerSecond: cookieCalculator(purchasedItems),
            lastTime,
            setLastTime,
        }}
        >
            {children}
        </GameContext.Provider>
    );
};