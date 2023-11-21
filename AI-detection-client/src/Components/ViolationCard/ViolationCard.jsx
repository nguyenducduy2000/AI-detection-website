function ViolationCard({ setModalShow }) {
    const handleModalShow = () => {
        setModalShow(true);
    };

    return (
        <div className="col">
            <div className="card h-100 bg-body-secondary">
                <img src="src/assets/img/test.jpg" className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">Violation name</h5>
                    <div className="d-flex flex-row justify-content-between">
                        <div className="d-flex flex-column text-start">
                            <div className="card-text">Locaion:</div>
                            <div className="card-text">Type:</div>
                            <div className="card-text">Last updated 3 mins ago</div>
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
                        <button className="btn btn-primary" type="button" onClick={() => handleModalShow()}>
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

export default ViolationCard;
