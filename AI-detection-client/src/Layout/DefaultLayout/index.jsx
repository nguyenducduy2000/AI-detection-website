import PropTypes from 'prop-types';

import Header from '~Components/Header';
import Footer from '~Components/Footer';

function DefaultLayout({ children }) {
    return (
        <>
            <Header />
            <div className="wrapper">{children}</div>
            <Footer />
        </>
    );
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DefaultLayout;
