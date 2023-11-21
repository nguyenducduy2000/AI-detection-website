import Pagination from 'react-bootstrap/Pagination';

function PaginationPage() {
    return (
        <div className="mt-4 d-flex justify-content-center">
            <Pagination size="md">
                <Pagination.First />
                <Pagination.Prev />
                <Pagination.Item>{1}</Pagination.Item>
                <Pagination.Item>{2}</Pagination.Item>
                <Pagination.Item>{3}</Pagination.Item>
                <Pagination.Ellipsis />
                <Pagination.Item>{18}</Pagination.Item>
                <Pagination.Item>{19}</Pagination.Item>
                <Pagination.Item>{20}</Pagination.Item>
                <Pagination.Next />
                <Pagination.Last />
            </Pagination>
        </div>
    );
}

export default PaginationPage;
