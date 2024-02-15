import { useState, useEffect, useMemo, useCallback } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { Button } from 'react-bootstrap';

import ModalVideo from '~/Components/ModalVideo';
import ModalConfirm from '~/Components/ModalConfirm';
import ViolationCard from '~/Components/ViolationCard/';
import PaginationPage from '~/Components/PaginationPage';
import Toasts from '~/Components/Toasts';
import renderService from '~/services/renderService';
import { useStore } from '~/store';

function Home() {
    // Get context from StoreContext
    const {
        filterParams,
        isActivate,
        setIsActivate,
        openFilter,
        setOpenFilter,
        toastInfo,
        setToastInfo,
        setToastShow,
    } = useStore();

    // Auto refresh page function
    const [refreshCount, setRefreshCount] = useState();
    useEffect(() => {
        if (isActivate) {
            const intervalId = setInterval(() => {
                // Trigger re-render logic
                const currentDate = new Date();
                const formattedDate = `${currentDate.getFullYear()}-${
                    currentDate.getMonth() + 1
                }-${currentDate.getDate()}`;
                const formattedTime = `${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;
                console.log('Page re-rendered at:', formattedDate, formattedTime);
                setRefreshCount((prevCount) => prevCount + 1);
            }, 60000); // 1 minute in milliseconds

            return () => {
                clearInterval(intervalId);
            };
        }
    }, [isActivate]);

    // ModalVideo setting
    const [modalVideoShow, setModalVideoShow] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [eventInfo, setEventInfo] = useState({});
    const [events, setEvents] = useState([]);

    // ModalConfirm setting
    const [modalConfirmShow, setModalConfirmShow] = useState(false);
    const [eventChoice, setEventChoice] = useState();
    const [confirmSuccessful, setConfirmSuccessful] = useState(false); // Track API call on confirm modal success
    const handlePassButtonRef = useCallback((BtnRef) => {
        // console.log(BtnRef);
        setEventChoice(BtnRef);
    }, []);

    //  Paginations setting
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [eventsPerPage] = useState(12);

    const handleCardClick = useCallback(
        async (id) => {
            const thisData = events.find((data) => data['messageId'] === id);
            setSelectedEvent(thisData);
            const res = await renderService.getEventInfo(id);
            setEventInfo(res);
        },
        [events],
    );
    const handleModalVideoToggle = useCallback(
        (videoId) => {
            setLoading(true);
            setModalVideoShow((prevModalShow) => !prevModalShow);
            handleCardClick(videoId);
            setLoading(false);
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
            // console.log(filterParams);
            if (window.location.href.includes('/filter')) {
                const response = await renderService.filter(filterParams);
                setEvents(response);
            } else if (isActivate) {
                const response = await renderService.render();
                setEvents(response);
            }
            setLoading(false);
        };

        axiosFetchEvents();
    }, [filterParams, confirmSuccessful, isActivate, setIsActivate, refreshCount, toastInfo]);

    // Get current events when change page
    const indexOfLastEvent = currentPage * eventsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
    const currentEvent = useMemo(
        () => events.slice(indexOfFirstEvent, indexOfLastEvent),
        [events, indexOfFirstEvent, indexOfLastEvent],
    );
    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleApiCallSuccess = useCallback(
        ({ ...message }) => {
            // console.log('trigger ApiCallSuccess successful');
            setConfirmSuccessful((prevApiCallSuccessful) => !prevApiCallSuccessful); // Set confirmSuccessful to trigger re-render
            setModalConfirmShow(false); // Close the ModalConfirm component
            console.log('message:::', message);
            setToastInfo({
                title: message.messageTitle,
                message: message.messageContent,
                type: message.messageType,
            });
            setToastShow(true);
        },
        [setToastInfo, setToastShow],
    );

    return (
        <>
            {/* {console.log('toastInfo:::', toastInfo)} */}
            {isActivate || window.location.href.includes('/filter') ? (
                <>
                    {toastInfo ? (
                        <Toasts title={toastInfo.title} message={toastInfo.message} type={toastInfo.type} />
                    ) : (
                        <Toasts title="ERROR" message="Something went wrong" type="danger" />
                    )}
                    <div className="container-fluid text-center mx-n2">
                        <div className="mt-1 row row-cols-1 row-cols-xl-4 row-cols-lg-3 row-cols-md-2 g-4 justify-content-start">
                            {currentEvent.length > 0 ? (
                                currentEvent.map((data) => (
                                    <ViolationCard
                                        key={data['messageId']}
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
                                        <div
                                            className="d-flex flex-fill flex-column justify-content-center align-items-center my-4"
                                            style={{ height: '69vh' }}
                                        >
                                            <h3>No data available, please check your internet connection</h3>
                                        </div>
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
                            loading={loading}
                            show={modalVideoShow}
                            onHide={handleModalVideoToggle}
                            data={selectedEvent} // Pass the selected video data as the videoData prop
                            eventInfo={eventInfo}
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
            ) : (
                <div
                    className="d-flex flex-fill flex-column justify-content-center align-items-center my-4"
                    style={{ height: '80vh' }}
                >
                    <h2 className="mb-5">Realtime option is currently off </h2>
                    <h2>
                        To see the Event data, please turn on Realtime option on or use{' '}
                        <Button
                            className="btn-lg"
                            onClick={() => {
                                setOpenFilter(!openFilter);
                            }}
                            aria-controls="example-collapse-text"
                            aria-expanded={open}
                        >
                            Filter
                        </Button>
                    </h2>
                </div>
            )}
        </>
    );
}

export default Home;
