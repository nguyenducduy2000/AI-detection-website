import { useRef } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import './ViolationCard.module.css';

function ViolationCard({ data, handleModalVideoToggle, handleModalConfirmToggle, handlePassButtonRef, loading }) {
    const acceptButtonRef = useRef();
    const rejectButtonRef = useRef();

    if (loading) {
        return <h2>Loading...</h2>;
    }

    const handleWatchVideo = () => {
        handleModalVideoToggle(data.messageid);
    };

    const handleToggleModalConfirm = (btnRef) => {
        // console.log(btnRef.current);
        handleModalConfirmToggle(data.messageid);
        handlePassButtonRef(btnRef.current);
    };

    return (
        <div className="col">
            <div className="card h-100 bg-body-secondary">
                <img
                    src={data.imageURL}
                    className="card-img-top"
                    alt="..."
                    onClick={() => {
                        handleWatchVideo(data.messageid);
                    }}
                />
                <div className="card-body">
                    <h5 className="card-title">{data.messageid}</h5>
                    <div className="d-flex flex-column justify-content-between align-items-center">
                        <div className="card-text">
                            <text className="fw-bold">Locaion_id:</text> {data.place_id}
                        </div>
                        <div className="card-text">
                            <text className="fw-bold">Event type:</text> {data.event_id}
                        </div>
                        <div className={clsx('card-text', 'card-timestamp')}>
                            <text className="fw-bold">Timestamp:</text> {data.timestamp}
                        </div>
                        <div className="card-text">
                            <text className="fw-bold">Sensor_id:</text> {data.sensor_id}
                        </div>
                        <div className="card-text">
                            <text className="fw-bold">Detection type:</text> {data.object_id}{' '}
                        </div>
                        <div className="card-text">
                            <text className="fw-bold">Status:</text>{' '}
                            {data.status === null ? 'Not checked' : data.status ? 'Approved' : 'Rejected'}
                        </div>
                    </div>
                </div>
                <div className="card-footer">
                    <div className="d-grid gap-2">
                        <button
                            className="btn btn-primary"
                            type="button"
                            onClick={() => {
                                handleModalVideoToggle(data.messageid);
                            }}
                        >
                            Watch video
                        </button>
                    </div>
                    <div className={clsx('mt-2', 'd-flex', 'flex-row', 'justify-content-between')}>
                        <button
                            ref={rejectButtonRef}
                            className={clsx('btn', 'btn-danger', 'flex-fill', 'me-2', 'reject-btn')}
                            type="button"
                            onClick={() => {
                                handleToggleModalConfirm(rejectButtonRef);
                            }}
                            disabled={loading}
                        >
                            Report
                        </button>
                        <button
                            ref={acceptButtonRef}
                            className={clsx('btn', 'btn-success', 'flex-fill', 'ms-2', 'accept-btn')}
                            type="button"
                            onClick={() => {
                                handleToggleModalConfirm(acceptButtonRef);
                            }}
                            disabled={loading}
                        >
                            Accept
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

ViolationCard.propTypes = {
    data: PropTypes.object.isRequired,
    handleModalVideoToggle: PropTypes.func.isRequired,
    handleModalConfirmToggle: PropTypes.func.isRequired,
    handlePassButtonRef: PropTypes.func.isRequired,
    loading: PropTypes.bool,
};

export default ViolationCard;
