import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import updateService from '~/services/updateService';

function ModalConfirm({ show, onHide, data, eventChoice, onApiCallSuccess, ...passProps }) {
    const props = {
        show,
        onHide,
        ...passProps,
    };
    // const handleConfirm = () => {
    //     if (data.action === 'accept') {
    //         handleAccept();
    //     } else if (data.action === 'reject') {
    //         handleReject();
    //     }
    // };

    const getMessage = () => {
        // console.log(eventChoice);
        if (eventChoice && eventChoice.classList.contains('accept-btn')) {
            return `You are about to Accept ${data.messageId}. Do you want to continue?`;
        } else if (eventChoice && eventChoice.classList.contains('reject-btn')) {
            return `You are about to Reject ${data.messageId}. Do you want to continue?`;
        }
    };

    const handleConfirm = () => {
        if (eventChoice && eventChoice.classList.contains('accept-btn')) {
            console.log('accept');
            updateService
                .accept(data.messageId)
                .then(() => {
                    // console.log('trigger ApiCallSuccess');
                    onApiCallSuccess();
                })
                .catch((error) => {
                    console.error(error);
                });
        } else if (eventChoice && eventChoice.classList.contains('reject-btn')) {
            console.log('reject');
            updateService
                .reject(data.messageId)
                .then(() => {
                    // console.log('trigger ApiCallSuccess');
                    onApiCallSuccess();
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    };

    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">{data.messageId}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="d-flex flex-fill">{getMessage()}</Modal.Body>
            <Modal.Footer className="d-flex flex-fill">
                <div className="mt-2 d-flex flex-row justify-content-end w-100">
                    <Button variant="secondary" className="me-2" onClick={onHide}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={handleConfirm}>
                        Confirm
                    </Button>
                </div>
            </Modal.Footer>
        </Modal>
    );
}

ModalConfirm.propTypes = {
    show: PropTypes.bool,
    onHide: PropTypes.func,
    data: PropTypes.object.isRequired,
    eventChoice: PropTypes.object,
    onApiCallSuccess: PropTypes.func,
};

export default ModalConfirm;
