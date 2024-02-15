import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import PropTypes from 'prop-types';
// import { useState, useEffect } from 'react';

import { useStore } from '~/store';

function Toasts({ title = '', message = '', type = 'info', duration = 3000 }) {
    // Toast function
    const { toastShow, setToastShow } = useStore();

    // useEffect(() => {
    //     setToastShow(true); // Set toastShow to true when component is mounted
    //     console.log('Toast mounted');
    // }, [toastShow]);

    return (
        <>
            <ToastContainer position="top-center" className="p-3 mt-5">
                <Toast
                    onClose={() => setToastShow(false)}
                    className="d-inline-block m-1"
                    bg={type}
                    show={toastShow}
                    delay={duration}
                    autohide
                >
                    <Toast.Header>
                        <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                        <strong className="me-auto">{title}</strong>
                    </Toast.Header>
                    <Toast.Body>{message}</Toast.Body>
                </Toast>
            </ToastContainer>
        </>
    );
}

Toasts.propTypes = {
    title: PropTypes.string,
    message: PropTypes.string,
    type: PropTypes.string,
    duration: PropTypes.number,
};

export default Toasts;
