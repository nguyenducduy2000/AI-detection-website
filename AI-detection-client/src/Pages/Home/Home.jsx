import { useState, useEffect, useMemo, useCallback, useContext } from 'react';
import Spinner from 'react-bootstrap/Spinner';

import ModalVideo from '~/Components/ModalVideo';
import ModalConfirm from '~/Components/ModalConfirm';
import ViolationCard from '~/Components/ViolationCard/ViolationCard';
import PaginationPage from '~/Components/PaginationPage';
import renderService from '~/services/renderService';
import { FilterContext } from '~/Components/FilterContext';

function Home() {
    // Get context from FilterContext
    const { filterParams } = useContext(FilterContext);

    // ModalVideo setting
    const [modalVideoShow, setModalVideoShow] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [events, setEvents] = useState([]);

    // ModalConfirm setting
    const [modalConfirmShow, setModalConfirmShow] = useState(false);
    const [eventChoice, setEventChoice] = useState();
    const [apiCallSuccessful, setApiCallSuccessful] = useState(false); // Track API call success
    const handlePassButtonRef = useCallback((BtnRef) => {
        // console.log(BtnRef);
        setEventChoice(BtnRef);
    }, []);

    //  Paginations setting
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [eventsPerPage] = useState(10);

    const handleCardClick = useCallback(
        (id) => {
            const thisData = events.find((data) => data['messageid'] === id);
            setSelectedEvent(thisData);
        },
        [events],
    );
    const handleModalVideoToggle = useCallback(
        (videoId) => {
            setModalVideoShow((prevModalShow) => !prevModalShow);
            handleCardClick(videoId);
        },
        [handleCardClick],
    );

    const handleModalConfirmToggle = useCallback(
        (videoId) => {
            if (modalVideoShow) {
                handleModalVideoToggle();
            }
            setModalConfirmShow((prevModalConfirmShow) => !prevModalConfirmShow);
            handleCardClick(videoId);
        },
        [handleModalVideoToggle, modalVideoShow, handleCardClick],
    );

    // const testData = events.find((data) => data.id === 1);
    // console.log(testData['id']);

    useEffect(() => {
        const axiosFetchEvents = async () => {
            setLoading(true);
            console.log(filterParams);
            if (window.location.href.includes('/filter')) {
                const response = await renderService.filter(filterParams);
                setEvents(response);
            } else {
                const response = await renderService.render();
                setEvents(response);
            }
            setLoading(false);
        };

        axiosFetchEvents();
    }, [apiCallSuccessful, filterParams]);

    // Get current events when change page
    const indexOfLastEvent = currentPage * eventsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
    const currentEvent = useMemo(
        () => events.slice(indexOfFirstEvent, indexOfLastEvent),
        [events, indexOfFirstEvent, indexOfLastEvent],
    );
    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleApiCallSuccess = () => {
        setApiCallSuccessful((prevApiCallSuccessful) => !prevApiCallSuccessful); // Set apiCallSuccessful to trigger re-render
        setModalConfirmShow(false); // Close the ModalConfirm component
    };

    return (
        <>
            <div className="container-fluid text-center mx-n2">
                <div className="mt-1 row row-cols-1 row-cols-xl-4 row-cols-lg-3 row-cols-md-2 g-4 justify-content-start">
                    {currentEvent.length > 0 ? (
                        currentEvent.map((data) => (
                            <ViolationCard
                                key={data['messageid']}
                                data={data}
                                handleModalVideoToggle={handleModalVideoToggle}
                                handleModalConfirmToggle={handleModalConfirmToggle}
                                handlePassButtonRef={handlePassButtonRef}
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
            {selectedEvent && (
                <ModalVideo
                    show={modalVideoShow}
                    onHide={handleModalVideoToggle}
                    data={selectedEvent} // Pass the selected video data as the videoData prop
                    handleModalConfirmToggle={handleModalConfirmToggle}
                />
            )}
            {selectedEvent && modalConfirmShow && (
                <ModalConfirm
                    show={modalConfirmShow}
                    onHide={handleModalConfirmToggle}
                    data={selectedEvent}
                    eventChoice={eventChoice}
                    onApiCallSuccess={handleApiCallSuccess} // Pass the handleApiCallSuccess function
                />
            )}
        </>
    );
}

export default Home;
