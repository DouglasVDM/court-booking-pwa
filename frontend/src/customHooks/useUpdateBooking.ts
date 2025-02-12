import { useState } from 'react';
import axios from 'axios';

interface Booking {
    id: string;
    date: string;
    time: string;
    court: string;
    user: string;
}

const useUpdateBooking = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const updateBooking = async (bookingId: string, updatedBooking: Partial<Booking>) => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.put(`/api/bookings/${bookingId}`, updatedBooking);
            setLoading(false);
            return response.data;
        } catch (err) {
            setLoading(false);
            setError(err.message);
            throw err;
        }
    };

    return { updateBooking, loading, error };
};

export default useUpdateBooking;