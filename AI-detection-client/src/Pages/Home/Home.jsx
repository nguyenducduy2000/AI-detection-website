import { useState, useEffect } from 'react';
import ModalVideo from '~/Components/ModalVideo';
import ViolationCard from '~/Components/ViolationCard/ViolationCard';
import PaginationPage from '~/Components/PaginationPage';

import renderService from '~/services/renderService';

function Home() {
    const [modalShow, setModalShow] = useState(false);
    const [violationData, setViolationData] = useState([]);
    const [selectedVideoId, setSelectedVideoId] = useState(null);
    const [selectedVideoData, setSelectedVideoData] = useState(null);

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
        const thisData = violationData.find((data) => data['id'] === id);
        setSelectedVideoData(thisData);
        // console.log('selectedVideoData:', selectedVideoData);
    };

    // const testData = violationData.find((data) => data.id === 1);
    // console.log(testData['id']);
    const axiosFetchData = async () => {
        const response = await renderService.render(5);
        console.log(response);
        setViolationData(response);
    };

    useEffect(() => {
        axiosFetchData();
    }, []);

    return (
        <>
            <div className="container-fluid text-center mx-n2">
                <div className="mt-1 row row-cols-1 row-cols-xl-4 row-cols-lg-3 row-cols-md-2 g-4 justify-content-start">
                    {violationData.length > 0 ? (
                        violationData.map((data) => (
                            <ViolationCard
                                key={data['id']}
                                data={data}
                                setModalShow={handleModalShow}
                                handleCardClick={handleCardClick}
                            />
                        ))
                    ) : (
                        <div>No data available, please wait few minutes for the data to load</div>
                    )}
                </div>
            </div>
            <PaginationPage onClick={() => setModalShow(true)} />
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
