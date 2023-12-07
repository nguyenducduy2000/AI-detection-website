import PropTypes from 'prop-types';

function ViolationCard({ data, setModalShow, handleCardClick }) {
    const handleModalShow = () => {
        handleCardClick(data.id);
        setModalShow(true);
    };

    return (
        <div className="col">
            <div className="card h-100 bg-body-secondary">
                <img
                    src={data.imageURL}
                    className="card-img-top"
                    alt="..."
                    onClick={() => {
                        handleModalShow();
                    }}
                />
                <div className="card-body">
                    <h5 className="card-title">{data.title}</h5>
                    <div className="d-flex flex-row justify-content-between">
                        <div className="d-flex flex-column text-start">
                            <div className="card-text">Locaion:</div>
                            <div className="card-text">Type:</div>
                            <div className="card-text">{data.timestamp}</div>
                        </div>
                        <div className="d-flex flex-column text-start">
                            <div className="card-text">Date:</div>
                            <div className="card-text">Vehicle type: </div>
                            <div className="card-text">Additional information: </div>
                        </div>
                    </div>
                </div>
                <div className="card-footer">
                    <div className="d-grid gap-2">
                        <button
                            className="btn btn-primary"
                            type="button"
                            onClick={() => {
                                handleModalShow();
                            }}
                        >
                            Watch video
                        </button>
                    </div>
                    <div className="mt-2 d-flex flex-row justify-content-between">
                        <button className="btn btn-danger flex-fill me-2" type="button">
                            Report
                        </button>
                        <button className="btn btn-success flex-fill ms-2" type="button">
                            Accept
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

ViolationCard.propTypes = {
    selected: PropTypes.bool.isRequired,
    data: PropTypes.object.isRequired,
    setModalShow: PropTypes.func.isRequired,
    handleCardClick: PropTypes.func.isRequired,
};

export default ViolationCard;
