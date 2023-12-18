import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Context from './Context';

const Provider = ({ children }) => {
    // State for Filter Open
    const [openFilter, setOpenFilter] = useState(false);

    // State for Realtime button
    const [isActivate, setIsActivate] = useState(() => {
        const storedIsActivate = localStorage.getItem('isActivate');
        return storedIsActivate ? JSON.parse(storedIsActivate) : true;
    });

    // State for Filter
    const [filterParams, setFilterParams] = useState({});

    useEffect(() => {
        // Get the stored value from localStorage when the component mounts
        const storedIsActivate = localStorage.getItem('isActivate');
        if (storedIsActivate) {
            try {
                setIsActivate(JSON.parse(storedIsActivate));
            } catch (error) {
                console.error('Error parsing storedIsActivate:', error);
            }
        }
    }, [setIsActivate]);

    useEffect(() => {
        // Store the current value of isActivate in localStorage whenever it changes
        // console.log(isActivate);
        localStorage.setItem('isActivate', JSON.stringify(isActivate));
    }, [isActivate]);

    return (
        <Context.Provider
            value={{ isActivate, setIsActivate, filterParams, setFilterParams, openFilter, setOpenFilter }}
        >
            {children}{' '}
        </Context.Provider>
    );
};

export default Provider;

Provider.propTypes = {
    children: PropTypes.node.isRequired,
};
