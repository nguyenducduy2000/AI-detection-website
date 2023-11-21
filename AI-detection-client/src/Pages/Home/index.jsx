import { useState } from 'react';
import ModalVideo from '~/Components/ModalVideo';
import ViolationCard from '~/Components/ViolationCard/ViolationCard';
import PaginationPage from '~/Components/PaginationPage';

function Home() {
    const [modalShow, setModalShow] = useState(false);

    return (
        <>
            <div class="container-fluid text-center mx-n2">
                <div className="mt-1 row row-cols-1 row-cols-xl-4 row-cols-lg-3 row-cols-md-2 g-4 justify-content-between">
                    <ViolationCard />
                </div>
            </div>
            <PaginationPage />
            <ModalVideo show={modalShow} onHide={() => setModalShow(false)} />
        </>
    );
}

export default Home;
