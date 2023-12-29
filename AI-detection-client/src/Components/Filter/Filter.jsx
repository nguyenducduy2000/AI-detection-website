import PropTypes from 'prop-types';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useStore } from '~/store';

function Filter({ onFilterSubmit }) {
    const navigate = useNavigate();
    // Get context from StoreContext
    const { setIsActivate, setFilterParams } = useStore();

    // Calendar setting
    const [valueFrom, setValueFrom] = useState(null);
    const [valueTo, setValueTo] = useState(null);
    const [eventType, setEventType] = useState('all');
    const [cameraID, setSensorID] = useState('all');
    const [status, setStatus] = useState('all');
    const handleSubmit = (event) => {
        event.preventDefault();

        // Set the time in the From calendar to the start of the day
        const startOfDayFrom = valueFrom ? new Date(valueFrom.setHours(0, 0, 0, 0)) : null;
        if (startOfDayFrom) {
            startOfDayFrom.setMinutes(startOfDayFrom.getMinutes() - startOfDayFrom.getTimezoneOffset());
        }
        const formattedValueFrom = startOfDayFrom ? startOfDayFrom.toISOString() : null;

        // Set the time in the To calendar to the end of the day
        const endOfDayTo = valueTo ? new Date(valueTo.setHours(23, 59, 59, 999)) : null;
        if (endOfDayTo) {
            endOfDayTo.setMinutes(endOfDayTo.getMinutes() - endOfDayTo.getTimezoneOffset());
        }
        const formattedValueTo = endOfDayTo ? endOfDayTo.toISOString() : null;

        // Check if eventType and cameraID are empty strings and set them to null
        if (eventType === '') {
            setEventType(null);
        }
        if (cameraID === '') {
            setSensorID(null);
        }

        const filterData = {
            eventType,
            timeFrom: formattedValueFrom,
            timeTo: formattedValueTo,
            cameraID,
            status,
        };
        console.log(filterData);
        setIsActivate(false);
        // Check the current URL and navigate accordingly
        const currentUrl = window.location.pathname;
        if (currentUrl.includes('/chart')) {
            navigate(`/chart/filter/${eventType}/${formattedValueFrom}/${formattedValueTo}/${cameraID}/${status}`);
        } else {
            navigate(`/filter/${eventType}/${formattedValueFrom}/${formattedValueTo}/${cameraID}/${status}`);
        }
        setFilterParams(filterData);
        onFilterSubmit();
    };

    return (
        <Form className="mb-3" onSubmit={handleSubmit} method="GET" action="/filter">
            <Form.Group className="m-3">
                <Form.Label className="fw-bold">Event type</Form.Label>
                <Form.Select
                    name="eventType"
                    aria-label="Default select example"
                    value={eventType || ''}
                    onChange={(event) => setEventType(event.target.value || 'all')}
                >
                    <option value="all">All</option>
                    <option value="human_event">Human Event</option>
                    <option value="vehicle_event">Vehicle Event</option>
                </Form.Select>
            </Form.Group>

            <Form.Group name="timestamp" className="m-3">
                <Form.Label className="fw-bold">Time</Form.Label>
                <div className="d-flex align-items-center m-1 flex-column">
                    {valueFrom && valueTo ? (
                        <div>
                            <Form.Label>
                                Selected Range: <span className="fw-bold">{valueFrom.toLocaleDateString()}</span> to{' '}
                                <span className="fw-bold">{valueTo.toLocaleDateString()}</span>
                            </Form.Label>
                        </div>
                    ) : (
                        <Form.Label>Please choose a date range (range reqired)</Form.Label>
                    )}
                    <Calendar
                        onChange={(value) => {
                            if (Array.isArray(value) && value.length === 2) {
                                setValueFrom(value[0]);
                                setValueTo(value[1]);
                            } else {
                                setValueFrom(null);
                                setValueTo(null);
                            }
                        }}
                        value={[valueFrom, valueTo]}
                        selectRange={true}
                    />
                    {valueFrom && valueTo && (
                        <Button
                            className="m-2"
                            variant="outline-secondary"
                            onClick={() => {
                                setValueFrom(null);
                                setValueTo(null);
                            }}
                        >
                            Cancel
                        </Button>
                    )}
                </div>
            </Form.Group>

            <Form.Group
                className="m-3"
                controlId="formBasicCheckbox"
                value={cameraID || ''}
                onChange={(event) => setSensorID(event.target.value || 'all')}
            >
                <Form.Label className="fw-bold">Camera ID</Form.Label>
                <Form.Select name="cameraID" aria-label="Default select example">
                    <option value="all">All</option>
                    <option value="0001">Camera 0001</option>
                    <option value="0002">Camera 0002</option>
                    <option value="0003">Camara 0003</option>
                </Form.Select>
            </Form.Group>

            <Form.Group
                className="m-3"
                controlId="formBasicCheckbox"
                value={status || 'all'}
                onChange={(event) => setStatus(event.target.value || 'all')}
            >
                <Form.Label className="fw-bold">Status</Form.Label>
                <Form.Select name="status" aria-label="Default select example">
                    <option value="all">All</option>
                    <option value="1">Approved</option>
                    <option value="0">Rejected</option>
                    <option value="null">Not Checked</option>
                </Form.Select>
            </Form.Group>

            <div className="d-flex justify-content-center">
                <Button size="md" variant="primary" type="submit">
                    Submit
                </Button>
            </div>
        </Form>
    );
}

Filter.propTypes = {
    onFilterSubmit: PropTypes.func,
};

export default Filter;
