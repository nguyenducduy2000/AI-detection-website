import { useState } from 'react';
import ModalVideo from '~/Components/ModalVideo';
import ViolationCard from '~/Components/ViolationCard/ViolationCard';
import PaginationPage from '~/Components/PaginationPage';

function Home() 
{
    const [modalShow, setModalShow] = useState(false);

    const handleModalHide = () => {
        setModalShow(false);
    };

    return (
        <>
            <div className="container-fluid text-center mx-n2">
                <div className="mt-1 row row-cols-1 row-cols-xl-4 row-cols-lg-3 row-cols-md-2 g-4 justify-content-start">
                    <nav aria-label="Page navigation example">
                    <ul class="pagination">
                    <li class="page-item"><a class="page-link" href="#">Previous</a></li>
                    <li class="page-item"><a class="page-link" href="#">1</a></li>
                    <li class="page-item"><a class="page-link" href="#">2</a></li>
                    <li class="page-item"><a class="page-link" href="#">3</a></li>
                    <li class="page-item"><a class="page-link" href="#">Next</a></li>
                    </ul>
                    </nav>
                </div>
            </div>
            <PaginationPage onClick={() => setModalShow(true)} />
            <ModalVideo show={modalShow} onHide={handleModalHide} />
        </>
    );
}

export default Home;
