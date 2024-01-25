import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import clsx from 'clsx';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import EventInfo from '~Components/EventInfo';

function ModalVideo({ loading, show, onHide, data, eventInfo, handleModalConfirmToggle, ...passProps }) {
    const props = {
        show,
        onHide,
        ...passProps,
    };
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    const handleToggleModalReport = () => {
        handleModalConfirmToggle(data.messageId);
    };

    const handleToggleModalAccept = () => {
        handleModalConfirmToggle(data.messageId);
    };

    // Check screen size for small screens and mobile devices
    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 1200);
        };

        handleResize(); // Check initial window size

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const isRowCols3 = eventInfo.length >= 3;

    return (
        <Modal {...props} size="xl" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">{data.messageId}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="d-flex flex-fill flex-column">
                <div className="ratio ratio-16x9">
                    <video controls>
                        <source src={data.videoURL} type="video/mp4" />
                    </video>
                </div>
                <div className="mt-3">
                    <div className="container-fluid">
                        <div
                            className={clsx('row', 'g-3', {
                                'row-cols-3': isRowCols3,
                                'row-cols-1': isSmallScreen,
                            })}
                        >
                            {eventInfo.length > 0 ? (
                                eventInfo.map((info) => (
                                    <EventInfo key={info['objectID']} info={info} className="col" />
                                ))
                            ) : (
                                <div className="d-flex flex-fill justify-content-center align-items-center">
                                    {loading ? (
                                        <Spinner animation="border" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </Spinner>
                                    ) : (
                                        <div
                                            className="d-flex flex-fill flex-column justify-content-center align-items-center my-4"
                                            style={{ height: '69vh' }}
                                        >
                                            <h3>No data available, please check your internet connection</h3>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer className="d-flex flex-column flex-fill">
                <div className="mt-2 d-flex flex-row justify-content-around w-100">
                    <Button variant="danger" className="flex-fill me-2 reject-btn" onClick={handleToggleModalReport}>
                        Reject
                    </Button>
                    <Button variant="success" className="flex-fill ms-2 accept-btn" onClick={handleToggleModalAccept}>
                        Accept
                    </Button>
                </div>
            </Modal.Footer>
        </Modal>
    );
}

ModalVideo.propTypes = {
    loading: PropTypes.bool,
    show: PropTypes.bool,
    onHide: PropTypes.func,
    data: PropTypes.object.isRequired,
    eventInfo: PropTypes.object.isRequired,
    handleModalConfirmToggle: PropTypes.func.isRequired,
};

export default ModalVideo;
