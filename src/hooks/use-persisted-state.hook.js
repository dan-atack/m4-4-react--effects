import React from 'react';

const usePersistedState = (key, defaultValue) => {
    const [value, setValue] = React.useState(() =>
        JSON.parse(window.localStorage.getItem(key)) || defaultValue
    );
    React.useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);
    return [value, setValue];
}

export default usePersistedState;