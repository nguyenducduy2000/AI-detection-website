import { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function Filter() {
    // Calendar setting
    const [valueFrom, setValueFrom] = useState(null);
    const [valueTo, setValueTo] = useState(null);
    return (
        <Form>
            <Form.Group className="m-3">
                <Form.Label>Object type</Form.Label>
                <Form.Select aria-label="Default select example">
                    <option>--- Loại tìm kiếm ---</option>
                    <option value="type 1">Type 1</option>
                    <option value="type 2">Type 2</option>
                    <option value="type 3">Type 3</option>
                </Form.Select>
            </Form.Group>

            <Form.Group className="m-3">
                <Form.Label>Time</Form.Label>
                <div className="d-flex justify-content-around m-1">
                    <div>
                        {valueFrom ? (
                            <Form.Label>From: {valueFrom.toLocaleDateString()}</Form.Label>
                        ) : (
                            <Form.Label>Please choose a date</Form.Label>
                        )}
                        <Calendar onChange={setValueFrom} value={valueFrom} />
                    </div>
                    <div>
                        {valueTo ? (
                            <Form.Label>To: {valueTo.toLocaleDateString()}</Form.Label>
                        ) : (
                            <Form.Label>Please choose a date</Form.Label>
                        )}
                        <Calendar onChange={setValueTo} value={valueTo} />
                    </div>
                </div>
            </Form.Group>

            <Form.Group className="m-3" controlId="formBasicCheckbox">
                <Form.Label>Sensor ID</Form.Label>
                <Form.Select aria-label="Default select example">
                    <option>--- Loại tìm kiếm ---</option>
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

export default Filter;
