import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Filter() {
    return (
        <Form>
            <Form.Group className="m-3" controlId="formBasicEmail">
                <Form.Label>Tìm kiếm</Form.Label>
                <Form.Control type="text" placeholder="Nhập vi phạm cần tìm..." />
            </Form.Group>

            <Form.Group className="m-3">
                <Form.Label>Tìm theo</Form.Label>
                <Form.Select aria-label="Default select example">
                    <option>--- Loại tìm kiếm ---</option>
                    <option value="1">Xe vi phạm giao thông</option>
                    <option value="2">Camera</option>
                    <option value="3">Loại vi phạm</option>
                </Form.Select>
            </Form.Group>

            <Form.Group className="m-3">
                <Form.Label>Thời gian vi phạm</Form.Label>
                <Form.Select aria-label="Default select example">
                    <option>--- Loại tìm kiếm ---</option>
                    <option value="1">1 ngày trước</option>
                    <option value="2">1 tuần trước</option>
                    <option value="3">1 tháng trước</option>
                </Form.Select>
            </Form.Group>

            <Form.Group className="m-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
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
