import React, { useState } from 'react';
import { addMember } from '../../../../backend/api/membersApi';
import { Member } from '../../../../types';

interface MemberFormProps {
    refreshMembers: (members: Member[]) => void;
}

const MemberForm: React.FC<MemberFormProps> = ({ refreshMembers }) => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [phone, setPhone] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newMember = await addMember({ name, email, phone, is_admin: false });
        refreshMembers((prev) => [...prev, newMember]);
        setName('');
        setEmail('');
        setPhone('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" />
            <button type="submit">Add Member</button>
        </form>
    );
};

export default MemberForm;
