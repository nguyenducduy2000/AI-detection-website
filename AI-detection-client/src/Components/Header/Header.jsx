import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Collapse from 'react-bootstrap/Collapse';
import ToggleButton from 'react-bootstrap/ToggleButton';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import Filter from '~Components/Filter';
import config from '~/config';
import { useStore } from '~/store';

function Header() {
    const [activeLink, setActiveLink] = useState(() => {
        if (window.location.pathname === '/') {
            return 'home';
        } else if (window.location.pathname.includes('/chart')) {
            return 'chart';
        }
    });
    const homeLink = useRef(null);
    const chartLink = useRef(null);
    const filterItemRef = useRef(null);

    // Realtime button state
    const { isActivate, setIsActivate, openFilter, setOpenFilter } = useStore();
    const navigate = useNavigate();

    const handleFilterSubmit = () => {
        setOpenFilter((prevOpen) => !prevOpen);
    };

    const handleRealtimeToggle = (e) => {
        setIsActivate(e.currentTarget.checked);
        if (e.currentTarget.checked) {
            navigate('/');
        }
    };

    useEffect(() => {
        const currentUrl = window.location.pathname;
        if (currentUrl.includes('/chart')) {
            homeLink.current.classList.remove('active');
            chartLink.current.classList.add('active');
        } else {
            homeLink.current.classList.add('active');
            chartLink.current.classList.remove('active');
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
    }, [openFilter]);

    useEffect(() => {
        if (isActivate) {
            setOpenFilter(false);
        }
    }, [isActivate, setOpenFilter]);

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
                                        setOpenFilter(false);
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
                                        setOpenFilter(false);
                                    }}
                                >
                                    Chart
                                </Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Button
                                    onClick={() => {
                                        setOpenFilter(!openFilter);
                                    }}
                                    aria-controls="example-collapse-text"
                                    aria-expanded={openFilter}
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
                                    checked={isActivate}
                                    value="1"
                                    onChange={handleRealtimeToggle}
                                >
                                    Realtime: {isActivate ? 'ON' : 'OFF'}
                                </ToggleButton>
                            </Nav.Item>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* The div is used to mount ref onto the collapse component */}
            <div ref={filterItemRef}>
                <Collapse in={openFilter}>
                    <div id="nav-collapse-filter">
                        <Filter onFilterSubmit={handleFilterSubmit} />
                    </div>
                </Collapse>
            </div>
        </>
    );
}

export default Header;
