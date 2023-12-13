import { createContext, useState } from 'react';
import { propTypes } from 'react-bootstrap/esm/Image';

export const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
    const [filterParams, setFilterParams] = useState({});

    return <FilterContext.Provider value={{ filterParams, setFilterParams }}>{children}</FilterContext.Provider>;
};

FilterProvider.propTypes = {
    children: propTypes.func,
};
