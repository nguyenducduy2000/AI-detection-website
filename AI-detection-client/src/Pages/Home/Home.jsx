import { useState, useEffect, useMemo } from 'react';
import Spinner from 'react-bootstrap/Spinner';

import ModalVideo from '~/Components/ModalVideo';
import ViolationCard from '~/Components/ViolationCard/ViolationCard';
import PaginationPage from '~/Components/PaginationPage';
import renderService from '~/services/renderService';

function Home() {
    const [modalShow, setModalShow] = useState(false);
    const [selectedVideoId, setSelectedVideoId] = useState(null);
    const [selectedVideoData, setSelectedVideoData] = useState(null);

    //  Paginations setting
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [eventsPerPage] = useState(10);

    const handleModalHide = () => {
        setModalShow(false);
        setSelectedVideoId(null);
    };

    const handleModalShow = (videoId) => {
        setModalShow(true);
        setSelectedVideoId(videoId);
    };

    const handleCardClick = (id) => {
        console.log('Data ID:', id);
        const thisData = events.find((data) => data['id'] === id);
        setSelectedVideoData(thisData);
        // console.log('selectedVideoData:', selectedVideoData);
    };

    // const testData = events.find((data) => data.id === 1);
    // console.log(testData['id']);

    useEffect(() => {
        const axiosFetchEvents = async () => {
            setLoading(true);
            const response = await renderService.render();
            setEvents(response);
            setLoading(false);
        };

        axiosFetchEvents();
    }, []);

    // Get current events
    const indexOfLastEvent = currentPage * eventsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
    const currentEvent = useMemo(
        () => events.slice(indexOfFirstEvent, indexOfLastEvent),
        [events, indexOfFirstEvent, indexOfLastEvent],
    );
    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            <div className="container-fluid text-center mx-n2">
                <div className="mt-1 row row-cols-1 row-cols-xl-4 row-cols-lg-3 row-cols-md-2 g-4 justify-content-start">
                    {currentEvent.length > 0 ? (
                        currentEvent.map((data) => (
                            <ViolationCard
                                key={data['id']}
                                data={data}
                                setModalShow={handleModalShow}
                                handleCardClick={handleCardClick}
                                loading={loading}
                            />
                        ))
                    ) : (
                        <div className="d-flex flex-fill justify-content-center align-items-center">
                            {loading ? (
                                <Spinner animation="border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </Spinner>
                            ) : (
                                <p>No data available, please check your internet connection</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
            <PaginationPage
                eventsPerPage={eventsPerPage}
                totalEvents={events.length}
                paginate={paginate}
                currentPage={currentPage}
            />
            {selectedVideoId && (
                <ModalVideo
                    show={modalShow}
                    onHide={handleModalHide}
                    videoData={selectedVideoData} // Pass the selected video data as the videoData prop
                />
            )}
        </>
    );
}

export default Home;
