import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Filter from '~Components/Filter';
import Collapse from 'react-bootstrap/Collapse';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';

function Header() {
    const [activeLink, setActiveLink] = useState('home');
    const [open, setOpen] = useState(false);
    const homeLink = useRef(null);
    const chartLink = useRef(null);
    const filterItemRef = useRef(null);

    useEffect(() => {
        if (activeLink === 'home') {
            homeLink.current.classList.add('active');
            chartLink.current.classList.remove('active');
        } else if (activeLink === 'link') {
            homeLink.current.classList.remove('active');
            chartLink.current.classList.add('active');
        }
    }, [activeLink]);

    const handleScrollIntoView = () => {
        filterItemRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'center',
        });
    };

    return (
        <>
            <Navbar expand="lg" sticky="top" className="bg-dark-subtle navbar-expand-lg">
                <Container fluid="xxl m-2">
                    <Navbar.Brand>AI detction website</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto mb-2 mb-lg-0" variant="underline" defaultActiveKey="/">
                            <Nav.Item>
                                <Link
                                    ref={homeLink}
                                    className={clsx('nav-link', { active: activeLink === 'home' })}
                                    to="/"
                                    onClick={() => {
                                        setActiveLink('home');
                                        setOpen(false);
                                    }}
                                >
                                    Home
                                </Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Link
                                    ref={chartLink}
                                    className={clsx('nav-link', { active: activeLink === 'link' })}
                                    to="/chart"
                                    onClick={() => {
                                        setActiveLink('link');
                                        setOpen(false);
                                    }}
                                >
                                    Chart
                                </Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Button
                                    onClick={() => {
                                        setOpen(!open);
                                        handleScrollIntoView();
                                    }}
                                    aria-controls="example-collapse-text"
                                    aria-expanded={open}
                                >
                                    Filter
                                </Button>
                            </Nav.Item>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Collapse in={open}>
                <div id="nav-collapse-filter">
                    <Filter ref={filterItemRef} />
                </div>
            </Collapse>
        </>
    );
}

export default Header;
