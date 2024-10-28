import React, { useEffect, useState } from 'react';
import { fetchMembers, deleteMember } from '../../../../backend/api/membersApi';
import MemberForm from './MemberForm';
import { Member } from '../../../../types';

const MembersList: React.FC = () => {
    const [members, setMembers] = useState<Member[]>([]);

    useEffect(() => {
        const getMembers = async () => {
            const membersList = await fetchMembers();
            setMembers(membersList);
        };
        getMembers();
    }, []);

    const handleDelete = async (id: number) => {
        await deleteMember(id);
        setMembers(members.filter((member) => member.member_id !== id));
    };

    return (
        <div>
            <h2>Members</h2>
            {members.map((member) => (
                <div key={member.member_id}>
                    <p>{member.name}</p>
                    <button onClick={() => handleDelete(member.member_id)}>Delete</button>
                </div>
            ))}
            <MemberForm refreshMembers={setMembers} />
        </div>
    );
};

export default MembersList;
