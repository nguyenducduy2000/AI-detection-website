import PropTypes from 'prop-types';

import Header from '~Components/Header';
import Footer from '~Components/Footer';
import { FilterProvider } from '~/Components/FilterContext';

function DefaultLayout({ children }) {
    return (
        <FilterProvider>
            <Header />
            <div className="wrapper">{children}</div>
            <Footer />
        </FilterProvider>
    );
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DefaultLayout;
