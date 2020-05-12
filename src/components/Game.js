import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { GameContext } from './GameContext';

import cookieSrc from '../cookie.svg';
import Item from './Item';

const Game = () => {

  const { numCookies, setNumCookies, purchasedItems, setPurchasedItems, cookiesPerSecond, deltaT, setDeltaT } = React.useContext(GameContext);

  const items = [
    { id: 'cursor', name: 'Cursor', cost: 10, value: 1 },
    { id: 'grandma', name: 'Grandma', cost: 100, value: 10 },
    { id: 'farm', name: 'Farm', cost: 1000, value: 80 },
    { id: 'complex', name: 'Cookie-Industrial Complex', cost: 12500, value: 750 }
  ];

  // Effect for updating the tab title:
  React.useEffect(() => {
    document.title = `Cookie Clicker: ${numCookies} cookies`;
  // Cleanup mechanism: 'fires' each of these statements whenever the numCookies is updated, and the last time it fires is when you exit,
  // so it winds up on the original title because the reset to the cookie number title would happen right AFTER you leave the page.
    return () => {
      document.title = "Cookie Cutter Workshop"
    };

  }, [numCookies]);

  // Effect for handling the spacebar to harvest cookies:
  React.useEffect(() =>  {
    const spaceKeyHandler = ev => {
      if (ev.key === " ") {
        setNumCookies(numCookies+1);
      }
    };
    document.addEventListener("keyup", spaceKeyHandler);

    return () => {
      document.removeEventListener("keyup", spaceKeyHandler)
    };
  }, [numCookies]);

  return (
    <Wrapper>
      <StyledLink>
        <Link to="/">Take me Home</Link>
      </StyledLink>
      <GameArea>
        <Indicator>
          <Total>{numCookies} cookies</Total>
          <strong>{cookiesPerSecond}</strong> cookies per second
        </Indicator>
        <Button onClick={ev => {
          setNumCookies(numCookies+1);
        }}>
          <Cookie src={cookieSrc} />
        </Button>
        <Button onClick={ev => {
          setNumCookies(100);
          setPurchasedItems({
            cursor: 0,
            grandma: 0,
            farm: 0,
            complex: 0,
            })
        }}>RESET Cookie Wealth and assets</Button>
      </GameArea>
      <ItemArea>
        <SectionTitle>Items:</SectionTitle>
        {items.map((item, idx) => {
          return (
            <Item key={item.id} 
            indexPos={idx}
            name={item.name} 
            cost={item.cost} 
            value={item.value}
            numOwned={purchasedItems[item.id]}
            handleClick={() => {
              if (item.cost <= numCookies) {
                setNumCookies(numCookies-item.cost);
                // Instantly a fan of object spreading:
                setPurchasedItems({...purchasedItems, [item.id]: (purchasedItems[item.id]+1)});
              }
            }}/>
          );
        })}
      </ItemArea>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
    
`;
const GameArea = styled.div`
  flex: 1;
  display: grid;
  place-items: center;
`;
const Button = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
`;

const Cookie = styled.img`
  width: 200px;
`;

const ItemArea = styled.div`
  height: 100%;
  padding-right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SectionTitle = styled.h3`
  text-align: center;
  font-size: 32px;
  color: yellow;
`;

const Indicator = styled.div`
  position: absolute;
  width: 250px;
  top: 0;
  left: 0;
  right: 0;
  margin: auto;
  text-align: center;
`;

const Total = styled.h3`
  font-size: 28px;
  color: lime;
`;

const StyledLink = styled.button`
  height: 64px;
  width: 128px;
  background-color: darkblue;
`

export default Game;
