import PropTypes from 'prop-types';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ModalVideo({ show, onHide, videoData, ...passProps }) {
    const props = {
        show,
        onHide,
        ...passProps,
    };

    // console.log(videoData);

    return (
        <Modal {...props} size="xl" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">{videoData.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="d-flex flex-fill">
                <div className="ratio ratio-16x9">
                    <video controls>
                        <source src={videoData.videoURL} type="video/mp4" />
                    </video>
                </div>
            </Modal.Body>
            <Modal.Footer className="d-flex flex-column flex-fill">
                <div className="mt-2 d-flex flex-row justify-content-around w-100">
                    <Button variant="danger" className="flex-fill me-2">
                        Reject
                    </Button>
                    <Button variant="success" className="flex-fill ms-2">
                        Accept
                    </Button>
                </div>
                <div className="mt-2 ms-auto p-2 justify-content-end">
                    <Button variant="primary" onClick={onHide}>
                        Close
                    </Button>
                </div>
            </Modal.Footer>
        </Modal>
    );
}

ModalVideo.propTypes = {
    show: PropTypes.bool,
    onHide: PropTypes.func,
    videoData: PropTypes.object.isRequired,
};

export default ModalVideo;
