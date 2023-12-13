import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Collapse from 'react-bootstrap/Collapse';
import ToggleButton from 'react-bootstrap/ToggleButton';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';

import Filter from '~Components/Filter';
import config from '~/config';

function Header() {
    const [activeLink, setActiveLink] = useState('home');
    const [open, setOpen] = useState(false);
    const homeLink = useRef(null);
    const chartLink = useRef(null);
    const filterItemRef = useRef(null);

    // Toggle button settings
    const [checked, setChecked] = useState(true);

    const handleFilterSubmit = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    useEffect(() => {
        if (activeLink === 'home') {
            homeLink.current.classList.add('active');
            chartLink.current.classList.remove('active');
        } else if (activeLink === 'link') {
            homeLink.current.classList.remove('active');
            chartLink.current.classList.add('active');
        }
    }, [activeLink]);

    useEffect(() => {
        const handleScrollIntoView = setTimeout(() => {
            if (filterItemRef.current) {
                filterItemRef.current.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                    inline: 'center',
                });
            }
        }, 150);

        return () => clearTimeout(handleScrollIntoView);
    }, [open]);

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
                                    to={config.routes.home}
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
                                    to={config.routes.chart}
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
                                    }}
                                    aria-controls="example-collapse-text"
                                    aria-expanded={open}
                                >
                                    Filter
                                </Button>
                            </Nav.Item>
                            <Nav.Item>
                                <ToggleButton
                                    className="mb-2"
                                    id="toggle-check"
                                    type="checkbox"
                                    variant="outline-success"
                                    checked={checked}
                                    value="1"
                                    onChange={(e) => setChecked(e.currentTarget.checked)}
                                >
                                    Realtime: {checked ? 'ON' : 'OFF'}
                                </ToggleButton>
                            </Nav.Item>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* The div is used to mount ref onto the collapse component */}
            <div ref={filterItemRef}>
                <Collapse in={open}>
                    <div id="nav-collapse-filter">
                        <Filter onFilterSubmit={handleFilterSubmit} />
                    </div>
                </Collapse>
            </div>
        </>
    );
}

export default Header;
