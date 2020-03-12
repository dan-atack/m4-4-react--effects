import React, { useRef } from 'react';

import styled from 'styled-components';

const StyledItem = styled.button`
    padding: 8px;
    margin: 8px;
    color: whitesmoke;
    font-size: 16px;
    text-shadow: 1px 1px black;
    background-color: tan;
    border: 1px solid orange;
    border-radius: 16px;
    h1 {
        font-size: 36px;
    }
    :hover {
        cursor: pointer;
    }
`

function Item({name, cost, value, numOwned, handleClick, indexPos}) {

    // Reefer is the flag. Give the flag to ALL of the elements... 
  const reefer = React.useRef(null);
  React.useEffect(() => {
      // ... but only focus on the one that's got our chosen index position:
      if (indexPos === 0) reefer.current.focus();
 }, []);
    return (
        <StyledItem onClick={handleClick} ref={ reefer }>
            <h1>{name}</h1>
            <p>
                <span>Cost: {cost} || </span>
                <span> Cookie Generation Rate: {value}</span>
            </p>
            <p>Number Owned: {numOwned}</p>
        </StyledItem>
    )
};

export default Item;