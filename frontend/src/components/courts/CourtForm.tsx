import React, { useState } from 'react';
import { addCourt } from '../../../../backend/api/courtsApi';
import { Court } from '../../../../types';

interface CourtFormProps {
    refreshCourts: (courts: Court[]) => void;
}

const CourtForm: React.FC<CourtFormProps> = ({ refreshCourts }) => {
    const [courtName, setCourtName] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        try {
            const newCourt = await addCourt({ court_name: courtName });
            refreshCourts((prev: any) => [...prev, newCourt]);
            setCourtName(''); // Clear input field after submission
        } catch (error) {
            console.error("Error adding court:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Court Name:
                <input
                    type="text"
                    value={courtName}
                    onChange={(e) => setCourtName(e.target.value)}
                    placeholder="Enter court name"
                    required
                />
            </label>
            <button type="submit">Add Court</button>
        </form>
    );
};

export default CourtForm;
