import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import PropTypes from 'prop-types';

function EventInfo({ info }) {
    return (
        <Card>
            <Card.Header>
                {' '}
                <span className="fw-bold">Object ID:</span> {info.objectID}
            </Card.Header>
            <ListGroup variant="flush">
                {info.objectType && (
                    <ListGroup.Item>
                        <span className="fw-bold">Object Type:</span> {info.objectType}
                    </ListGroup.Item>
                )}
                {info.gender && (
                    <ListGroup.Item>
                        <span className="fw-bold">Gender:</span> {info.gender}
                    </ListGroup.Item>
                )}
                {info.age && (
                    <ListGroup.Item>
                        <span className="fw-bold">Age:</span> {info.age}
                    </ListGroup.Item>
                )}
                {info.vehicleType && (
                    <ListGroup.Item>
                        <span className="fw-bold">Vehicle Type:</span> {info.vehicleType}
                    </ListGroup.Item>
                )}
                {info.vehicleBrand && (
                    <ListGroup.Item>
                        <span className="fw-bold">Vehicle Brand:</span> {info.vehicleBrand}
                    </ListGroup.Item>
                )}
                {info.vehicleColor && (
                    <ListGroup.Item>
                        <span className="fw-bold">Vehicle Color:</span> {info.vehicleColor}
                    </ListGroup.Item>
                )}
                {info.vehicleLicence && (
                    <ListGroup.Item>
                        <span className="fw-bold">Vehicle Licence:</span> {info.vehicleLicence}
                    </ListGroup.Item>
                )}
                <ListGroup.Item>
                    <span className="fw-bold">Event type:</span> {info.eventType ? info.eventType : 'Null'}
                </ListGroup.Item>
                <ListGroup.Item>
                    <span className="fw-bold">Action:</span> {info.action ? info.action : 'Null'}
                </ListGroup.Item>
                {info.bbox_topleftx != null && (
                    <ListGroup.Item>
                        <span className="fw-bold">bbox_topleftx:</span> {info.bbox_topleftx}
                    </ListGroup.Item>
                )}
                {info.bbox_toplefty != null && (
                    <ListGroup.Item>
                        <span className="fw-bold">bbox_toplefty:</span> {info.bbox_toplefty}
                    </ListGroup.Item>
                )}
                {info.bbox_bottomrightx != null && (
                    <ListGroup.Item>
                        <span className="fw-bold">bbox_bottomrightx:</span> {info.bbox_bottomrightx}
                    </ListGroup.Item>
                )}
                {info.bbox_bottomrighty != null && (
                    <ListGroup.Item>
                        <span className="fw-bold">bbox_bottomrighty:</span> {info.bbox_bottomrighty}
                    </ListGroup.Item>
                )}
            </ListGroup>
        </Card>
    );
}

EventInfo.propTypes = {
    info: PropTypes.object.isRequired,
};

export default EventInfo;
