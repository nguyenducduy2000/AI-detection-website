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

export default DefaultLayout;
