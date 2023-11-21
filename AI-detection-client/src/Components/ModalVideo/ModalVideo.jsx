import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ModalVideo(props) {
    return (
        <Modal {...props} size="xl" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Violation name</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Detection modal</h4>
                <p>
                    This modal is used to watch detection videos got from AI cameras. Our mission is to verify whether
                    or not that detection is valid.
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalVideo;
