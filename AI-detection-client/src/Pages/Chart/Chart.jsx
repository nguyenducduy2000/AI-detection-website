import PieChart from "~/Components/PieChart/PieChart";
import LineChart from "~/Components/LineChart/LineChart";
import { useState } from 'react';
import ModalVideo from '~/Components/ModalVideo';
import ViolationCard from '~/Components/ViolationCard/ViolationCard';
import PaginationPage from '~/Components/PaginationPage';
import { createRoot } from 'react-dom/client';


function Chart() {
    const [modalShow, setModalShow] = useState(false);
    
    const handleModalHide = () => {
        setModalShow(false);
    };

    return (
        <>
            <div className=" display-flex align-items-center justify-content-space-between flex-row">
            <PieChart show={modalShow} onHide={handleModalHide} />
            <LineChart show={modalShow} onHide={handleModalHide} />
            </div>
        </>
    );
}

export default Chart;
