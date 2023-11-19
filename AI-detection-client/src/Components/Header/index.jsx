import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';

function Header() {
    const [activeLink, setActiveLink] = useState(null);
    const thisRef = useRef(null);
    const thatRef = useRef(null);

    useEffect(() => {
        if (activeLink === 'home') {
            thisRef.current.focus();
            thisRef.current.classList.add('active');
            thatRef.current.classList.remove('active');
        } else if (activeLink === 'link') {
            thatRef.current.focus();
            thisRef.current.classList.remove('active');
            thatRef.current.classList.add('active');
        }
    }, [activeLink]);

    return (
        <Navbar expand="lg" className="bg-dark-subtle navbar-expand-lg">
            <Container fluid="xxl m-2">
                <Navbar.Brand>AI detction website</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto mb-2 mb-lg-0" variant="underline" defaultActiveKey="/">
                        <Nav.Item>
                            <Link
                                ref={thisRef}
                                className={clsx('nav-link', { active: activeLink === 'home' })}
                                to="/"
                                onClick={() => setActiveLink('home')}
                            >
                                Home
                            </Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Link
                                ref={thatRef}
                                className={clsx('nav-link', { active: activeLink === 'link' })}
                                to="/chart"
                                onClick={() => setActiveLink('link')}
                            >
                                Chart
                            </Link>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
