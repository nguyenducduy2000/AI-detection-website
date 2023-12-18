import PropTypes from 'prop-types';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
// import renderService from '~/services/renderService';
import { useStore } from '~/store';

function Filter({ onFilterSubmit }) {
    const navigate = useNavigate();
    // const {
    //     paramObjectType = objectType,
    //     paramTimeFrom = valueFrom,
    //     paramTimeTo = valueTo,
    //     paramSensorID = sensorID,
    // } = useParams();
    // Get context from StoreContext
    const { setIsActivate, setFilterParams } = useStore();

    // Calendar setting
    const [valueFrom, setValueFrom] = useState(null);
    const [valueTo, setValueTo] = useState(null);
    const [objectType, setObjectType] = useState(null);
    const [sensorID, setSensorID] = useState(null);
    const handleSubmit = (event) => {
        event.preventDefault();

        // Set the time in the From calendar to the start of the day
        const startOfDayFrom = valueFrom ? new Date(valueFrom.setHours(0, 0, 0, 0)) : null;
        const formattedValueFrom = startOfDayFrom ? startOfDayFrom.toISOString() : null;

        // Set the time in the To calendar to the end of the day
        const endOfDayTo = valueTo ? new Date(valueTo.setHours(23, 59, 59, 999)) : null;
        const formattedValueTo = endOfDayTo ? endOfDayTo.toISOString() : null;

        // Check if objectType and sensorID are empty strings and set them to null
        if (objectType === '') {
            setObjectType(null);
        }
        if (sensorID === '') {
            setSensorID(null);
        }

        const filterData = {
            objectType,
            timeFrom: formattedValueFrom,
            timeTo: formattedValueTo,
            sensorID,
        };
        console.log(filterData);
        setIsActivate(false);
        navigate(`/filter/${objectType}/${formattedValueFrom}/${formattedValueTo}/${sensorID}`);
        setFilterParams(filterData);
        onFilterSubmit();
    };

    return (
        <Form onSubmit={handleSubmit} method="GET" action="/filter">
            <Form.Group className="m-3">
                <Form.Label>Object type</Form.Label>
                <Form.Select
                    name="objectType"
                    aria-label="Default select example"
                    value={objectType || ''}
                    onChange={(event) => setObjectType(event.target.value || null)}
                >
                    <option value="">All</option>
                    <option value="type_1">Type 1</option>
                    <option value="type_2">Type 2</option>
                    <option value="type_3">Type 3</option>
                </Form.Select>
            </Form.Group>

            <Form.Group name="timestamp" className="m-3">
                <Form.Label>Time</Form.Label>
                <div className="d-flex justify-content-around m-1">
                    <div>
                        {valueFrom ? (
                            <Form.Label>From: {valueFrom.toLocaleDateString()}</Form.Label>
                        ) : (
                            <Form.Label>Please choose a date</Form.Label>
                        )}
                        <Calendar
                            onChange={(value) => {
                                if (value.getTime() === valueFrom?.getTime()) {
                                    // If the clicked date is the same as the current selected date, deselect it
                                    setValueFrom(null);
                                } else {
                                    setValueFrom(value);
                                }
                            }}
                            value={valueFrom}
                        />
                    </div>
                    <div>
                        {valueTo ? (
                            <Form.Label>To: {valueTo.toLocaleDateString()}</Form.Label>
                        ) : (
                            <Form.Label>Please choose a date</Form.Label>
                        )}
                        <Calendar
                            onChange={(value) => {
                                if (value.getTime() === valueTo?.getTime()) {
                                    // If the clicked date is the same as the current selected date, deselect it
                                    setValueTo(null);
                                } else {
                                    setValueTo(value);
                                }
                            }}
                            value={valueTo}
                        />
                    </div>
                </div>
            </Form.Group>

            <Form.Group
                className="m-3"
                controlId="formBasicCheckbox"
                value={sensorID || ''}
                onChange={(event) => setSensorID(event.target.value || null)}
            >
                <Form.Label>Sensor ID</Form.Label>
                <Form.Select name="sensorID" aria-label="Default select example">
                    <option value="">All</option>
                    <option value="1">Sensor 1</option>
                    <option value="2">Sensor 2</option>
                    <option value="3">Sensor 3</option>
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
