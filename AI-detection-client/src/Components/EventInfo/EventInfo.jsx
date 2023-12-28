import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import PropTypes from 'prop-types';

function EventInfo({ info }) {
    return (
        <>
            {info.objectType === 'Human' ? (
                <Card>
                    <Card.Header>
                        {' '}
                        <span className="fw-bold">Object ID:</span> {info.objectID}
                    </Card.Header>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <span className="fw-bold">Object Type:</span> {info.objectType}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <span className="fw-bold">Gender:</span> {info.gender}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <span className="fw-bold">Age:</span> {info.age}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <span className="fw-bold">Event type:</span> {info.eventType}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <span className="fw-bold">Action:</span> {info.action}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <span className="fw-bold">bbox_topleftx:</span> {info.bbox_topleftx}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <span className="fw-bold">bbox_toplefty:</span> {info.bbox_toplefty}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <span className="fw-bold">bbox_bottomrightx:</span> {info.bbox_bottomrightx}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <span className="fw-bold">bbox_bottomrighty:</span> {info.bbox_bottomrighty}
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            ) : info.objectType === 'Vehicle' ? (
                <Card className="col">
                    <Card.Header>
                        {' '}
                        <span className="fw-bold">Object Type:</span> {info.objectType}
                    </Card.Header>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <span className="fw-bold">Vehicle Type:</span> {info.vehicleType}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <span className="fw-bold">Vehicle Brand:</span> {info.vehicleBrand}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <span className="fw-bold">Vehicle Color:</span> {info.vehicleColor}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <span className="fw-bold">Vehicle Licence:</span> {info.vehicleLicence}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <span className="fw-bold">Event type:</span> {info.eventType}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <span className="fw-bold">Action:</span> {info.action}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <span className="fw-bold">bbox_topleftx:</span> {info.bbox_topleftx}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <span className="fw-bold">bbox_toplefty:</span> {info.bbox_toplefty}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <span className="fw-bold">bbox_bottomrightx:</span> {info.bbox_bottomrightx}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <span className="fw-bold">bbox_bottomrighty:</span> {info.bbox_bottomrighty}
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            ) : null}
        </>
    );
}

EventInfo.propTypes = {
    info: PropTypes.object.isRequired,
};

export default EventInfo;
