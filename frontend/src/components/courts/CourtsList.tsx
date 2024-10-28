import React, { useEffect, useState } from 'react';
import { fetchCourts, deleteCourt } from '../../../../backend/api/courtsApi';
import CourtForm from '../CourtForm';
import { Court } from '../../../../types';

const CourtsList: React.FC = () => {
    const [courts, setCourts] = useState<Court[]>([]);

    useEffect(() => {
        const getCourts = async () => {
            const courtsList = await fetchCourts();
            setCourts(courtsList);
        };
        getCourts();
    }, []);

    const handleDelete = async (id: number) => {
        await deleteCourt(id);
        setCourts(courts.filter((court) => court.court_id !== id));
    };

    return (
        <div>
            <h2>Courts</h2>
            {courts.map((court) => (
                <div key={court.court_id}>
                    <p>{court.court_name}</p>
                    <button onClick={() => handleDelete(court.court_id)}>Delete</button>
                </div>
            ))}
            <CourtForm refreshCourts={setCourts} />
        </div>
    );
};

export default CourtsList;
