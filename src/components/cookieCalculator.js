// The cookie calculator is a regular old function, placed here to reduce clutter.

import PropTypes from 'prop-types';


const CookieCalculator = factorsOfProduction => {
    return (   
        (factorsOfProduction.cursor + (factorsOfProduction.grandma * 10) + (factorsOfProduction.farm * 80) + (factorsOfProduction.complex * 750))
    )
};

CookieCalculator.PropTypes = {
    purchasedItems: PropTypes.shape({
        cursor: PropTypes.number.isRequired,
        grandma: PropTypes.number.isRequired,
        farm: PropTypes.number.isRequired,
        complex: PropTypes.number.isRequired
    })
};

export default CookieCalculator;