import React, { useState } from 'react';
const OfferingForm: React.FC<{ refreshOfferings: (offerings: any[]) => void }> = ({ refreshOfferings }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newOffering = await addOffering({ name, description, price });
        refreshOfferings((prev) => [...prev, newOffering.data]);
        setName('');
        setDescription('');
        setPrice(0);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
            <input type="number" value={price} onChange={(e) => setPrice(parseFloat(e.target.value))} placeholder="Price" />
            <button type="submit">Add Offering</button>
        </form>
    );
};
