// types.ts

export interface Member {
    member_id: number;
    name: string;
    email?: string;
    phone?: string;
    membership_start?: Date;
    membership_end?: Date;
    is_admin: boolean;
    admin_role?: string;
}

export interface Court {
    court_id: number;
    court_name: string;
}
export interface bookingTypes {
    booking_type_id: number;
    booking_type_name: string;
}

export interface Booking {
    booking_id: number;
    member_id: number;
    court_id: number;
    start_time: Date;
    end_time: Date;
}

export interface SpecialOffering {
    offering_id: number;
    name: string;
    description: string;
    price: number;
    start_date: Date;
    end_date: Date;
    is_active: boolean;
}
