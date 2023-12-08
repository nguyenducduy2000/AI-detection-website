import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Pagination from 'react-bootstrap/Pagination';

function PaginationPage({ eventsPerPage, totalEvents, paginate, currentPage }) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalEvents / eventsPerPage); i++) {
        pageNumbers.push(i);
    }

    const paginateHandler = (number) => {
        paginate(number);
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'instant' });
        }, 0);
    };

    const renderPaginationItems = () => {
        const items = [];

        if (pageNumbers.length <= 10) {
            pageNumbers.forEach((number) => {
                items.push(
                    <Link key={number} onClick={() => paginateHandler(number)}>
                        <Pagination.Item active={number === currentPage}>{number}</Pagination.Item>
                    </Link>,
                );
            });
        } else {
            const firstPage = pageNumbers[0];
            const lastPage = pageNumbers[pageNumbers.length - 1];
            const displayedPages = pageNumbers.filter(
                (number) =>
                    number === firstPage ||
                    number === lastPage ||
                    (number >= currentPage - 2 && number <= currentPage + 2),
            );

            let previousNumber = null;

            displayedPages.forEach((number) => {
                if (previousNumber !== null && number !== previousNumber + 1) {
                    if (number === currentPage - 2 && number !== firstPage + 1) {
                        items.push(<Pagination.Ellipsis key="ellipsis-start" />);
                    } else if (number === currentPage + 2 && number !== lastPage - 1) {
                        items.push(<Pagination.Ellipsis key="ellipsis-end" />);
                    } else {
                        items.push(<Pagination.Ellipsis key={`ellipsis-${number - 1}`} />);
                    }
                }

                items.push(
                    <Link key={number} onClick={() => paginateHandler(number)}>
                        <Pagination.Item active={number === currentPage}>{number}</Pagination.Item>
                    </Link>,
                );

                previousNumber = number;
            });
        }

        return items;
    };

    return (
        <div className="mt-4 d-flex justify-content-center">
            <Pagination size="md">
                <Pagination.First disabled={currentPage === 1} onClick={() => paginateHandler(1)}>
                    First
                </Pagination.First>
                <Pagination.Prev disabled={currentPage === 1} onClick={() => paginateHandler(currentPage - 1)}>
                    Previous
                </Pagination.Prev>
                {renderPaginationItems()}
                <Pagination.Next
                    disabled={currentPage === pageNumbers.length}
                    onClick={() => paginateHandler(currentPage + 1)}
                >
                    Next
                </Pagination.Next>
                <Pagination.Last
                    disabled={currentPage === pageNumbers.length}
                    onClick={() => paginateHandler(pageNumbers.length)}
                >
                    Last
                </Pagination.Last>
            </Pagination>
        </div>
    );
}

PaginationPage.propTypes = {
    eventsPerPage: PropTypes.number.isRequired,
    totalEvents: PropTypes.number.isRequired,
    paginate: PropTypes.func.isRequired,
    currentPage: PropTypes.number.isRequired,
};

export default PaginationPage;
