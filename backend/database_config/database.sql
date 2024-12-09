-- public.courts definition
--DROP TABLE IF EXISTS courts CASCADE;
CREATE TABLE IF NOT EXISTS courts (
    court_id serial4 NOT NULL,
    court_name varchar(20) NOT NULL,
    has_lights bool DEFAULT FALSE NOT NULL,
    CONSTRAINT courts_court_name_key UNIQUE (court_name),
    CONSTRAINT courts_pkey PRIMARY KEY (court_id)
);
INSERT INTO courts (court_name, has_lights)
VALUES ('Court 1', TRUE),
    ('Court 2', TRUE),
    ('Court 3', FALSE),
    ('Court 4', FALSE);
SELECT *
FROM courts c;
-- public.booking_types definition
-- Drop table
DROP TABLE booking_types;
CREATE TABLE booking_types (
    booking_type_id serial4 NOT NULL,
    booking_type_name varchar(50) NOT NULL,
    CONSTRAINT booking_types_booking_type_name_key UNIQUE (booking_type_name),
    CONSTRAINT booking_types_pkey PRIMARY KEY (booking_type_id)
);
INSERT INTO booking_types (booking_type_name)
VALUES('singles'),
    ('doubles'),
    ('practice'),
    ('coaching'),
    ('saturday_social'),
    ('morning_ladies'),
    ('league'),
    ('tournament');
SELECT *
FROM booking_types bt;
-- public.start_times definition
-- Drop table
-- DROP TABLE start_times;
CREATE TABLE start_times (
    start_time_id serial4 NOT NULL,
    start_time time NOT NULL,
    CONSTRAINT start_times_start_time_key UNIQUE (start_time)
);
INSERT INTO start_times (start_time)
VALUES ('06:00'),
    ('06:30'),
    ('07:00'),
    ('07:30'),
    ('08:00'),
    ('08:30'),
    ('09:00'),
    ('09:30'),
    ('10:00'),
    ('10:30'),
    ('11:00'),
    ('11:30'),
    ('12:00'),
    ('12:30'),
    ('13:00'),
    ('13:30'),
    ('14:00'),
    ('14:30'),
    ('15:00'),
    ('15:30'),
    ('16:00'),
    ('16:30'),
    ('17:00'),
    ('17:30'),
    ('18:00'),
    ('18:30'),
    ('19:00'),
    ('19:30');
SELECT *
FROM start_times st;
-- public.end_times definition
-- Drop table
-- DROP TABLE end_times;
CREATE TABLE end_times (
    end_time_id serial4 NOT NULL,
    end_time time(0) NOT NULL,
    CONSTRAINT end_times_end_time_id_key UNIQUE (end_time_id)
);
INSERT INTO end_times (end_time)
VALUES ('06:30'),
    ('07:00'),
    ('07:30'),
    ('08:00'),
    ('08:30'),
    ('09:00'),
    ('09:30'),
    ('10:00'),
    ('10:30'),
    ('11:00'),
    ('11:30'),
    ('12:00'),
    ('12:30'),
    ('13:00'),
    ('13:30'),
    ('14:00'),
    ('14:30'),
    ('15:00'),
    ('15:30'),
    ('16:00'),
    ('16:30'),
    ('17:00'),
    ('17:30'),
    ('18:00'),
    ('18:30'),
    ('19:00'),
    ('19:30'),
    ('20:00'),
    ('20:30'),
    ('21:00'),
    ('21:30'),
    ('22:00');
SELECT *
FROM end_times et;
-- public.bookings definition
-- Drop table
-- DROP TABLE bookings;
CREATE TABLE bookings (
    booking_id serial4 NOT NULL,
    member_id int4 NOT NULL,
    booked_at timestamp DEFAULT now() NULL,
    booking_date date NOT NULL,
    start_time_id int4 NOT NULL,
    end_time_id int4 NOT NULL,
    booking_type_id int4 NOT NULL,
    court_id int4 NOT NULL,
    CONSTRAINT bookings_pkey PRIMARY KEY (booking_id),
    CONSTRAINT unique_booking UNIQUE (
        court_id,
        booking_date,
        start_time_id,
        end_time_id
    ),
    CONSTRAINT fk_booking_type_id FOREIGN KEY (booking_type_id) REFERENCES booking_types(booking_type_id) ON DELETE CASCADE,
    CONSTRAINT fk_court FOREIGN KEY (court_id) REFERENCES courts(court_id) ON DELETE CASCADE,
    CONSTRAINT fk_end_time FOREIGN KEY (end_time_id) REFERENCES end_times(end_time_id) ON DELETE CASCADE,
    CONSTRAINT fk_member FOREIGN KEY (member_id) REFERENCES members(member_id) ON DELETE CASCADE,
    CONSTRAINT fk_start_time FOREIGN KEY (start_time_id) REFERENCES start_times(start_time_id) ON DELETE CASCADE
);
INSERT INTO bookings (
        member_id,
        booked_at,
        booking_date,
        start_time_id,
        end_time_id,
        booking_type_id,
        court_id
    )
VALUES(
        1,
        now(),
        '2024-12-07',
        1,
        3,
        2,
        3
    );
-- 
-- 
-- 
-- 
-- 
CREATE TABLE Special_Offerings (
    offering_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2),
    start_date DATE,
    end_date DATE,
    is_active BOOLEAN DEFAULT TRUE
);
CREATE TABLE Visitors (
    visitor_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    phone VARCHAR(20),
    visit_date DATE DEFAULT CURRENT_DATE,
    -- Date of the visitor’s visit
    purpose VARCHAR(255) -- Purpose of visit (e.g., "Trial session", "Event")
);
-- Visitors data
INSERT INTO Visitors (first_name, email, phone, purpose)
VALUES (
        'Visitor One',
        'visitor1@example.com',
        '555-7777',
        'Trial session'
    ),
    (
        'Visitor Two',
        'visitor2@example.com',
        NULL,
        'Event'
    );
-- 
CREATE TABLE Court_Availability (
    id INT PRIMARY KEY AUTO_INCREMENT,
    member_id INT,
    -- ID of the member (e.g., 123)
    court_id INT,
    -- ID of the court for unique identification
    date DATE,
    -- Date of availability (e.g., '2023-06-05')
    start_time TIME,
    -- Start time of the available slot (e.g., '09:00:00')
    end_time TIME,
    -- End time of the available slot (e.g., '11:30:00')
    duration DECIMAL(3, 1),
    -- Duration of the booking in hours (e.g., 2.5)
    CONSTRAINT chk_duration CHECK (
        duration BETWEEN 0.5 AND 3.0
    ) -- Ensures duration is between 0.5 and 3 hours
);
CREATE TABLE Court_Availability (
    id INT PRIMARY KEY AUTO_INCREMENT,
    member_id INT,
    court_id INT,
    date DATE,
    start_time TIME,
    end_time TIME,
    duration DECIMAL(3, 1),
    CONSTRAINT fk_member FOREIGN KEY (member_id) REFERENCES Members(member_id),
    CONSTRAINT fk_court FOREIGN KEY (court_id) REFERENCES Courts(court_id),
    CONSTRAINT chk_duration CHECK (
        duration BETWEEN 0.5 AND 3.0
    )
);
INSERT INTO Court_Availability (
        member_id,
        court_id,
        date,
        start_time,
        end_time,
        duration
    )
VALUES (
        123,
        1,
        '2023-06-05',
        '09:00:00',
        '11:30:00',
        2.5
    ),
    (
        123,
        1,
        '2023-06-05',
        '14:00:00',
        '16:00:00',
        2.0
    ),
    (
        123,
        2,
        '2023-06-06',
        '10:00:00',
        '12:30:00',
        2.5
    ),
    (
        123,
        2,
        '2023-06-06',
        '16:30:00',
        '18:00:00',
        1.5
    ),
    -- Add other sample rows here as needed
    -- 
    drop table members;
CREATE TABLE members (
    member_id serial PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    surname VARCHAR(100) NOT NULL,
    -- Changed from email to surname
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20) CHECK (phone ~ '^\+27 \d{2} \d{3} \d{4}$'),
    -- Enforces ZA format
    membership_start DATE,
    membership_end DATE,
    is_admin BOOLEAN DEFAULT FALSE,
    -- Indicates if the member has admin privileges
    admin_role VARCHAR(50),
    -- Role of the member if they are an admin
    is_active BOOLEAN DEFAULT TRUE -- Indicates if the member is active
);
-- Members data with ZA format phone numbers
INSERT INTO members (
        first_name,
        surname,
        email,
        phone,
        membership_start,
        membership_end,
        is_admin,
        admin_role
    )
VALUES (
        'John',
        'Doe',
        'john@example.com',
        '+27 12 345 6789',
        '2023-01-01',
        '2024-01-01',
        FALSE,
        NULL
    ),
    (
        'Jane',
        'Smith',
        'jane@example.com',
        '+27 12 456 6789',
        '2023-02-01',
        '2024-02-01',
        TRUE,
        'Manager'
    );
--
drop table visitors ;
CREATE TABLE visitors (
    visitor_id SERIAL PRIMARY KEY,
    -- Use SERIAL for auto-increment
    first_name VARCHAR(100) NOT NULL,
    surname VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20) CHECK (phone ~ '^\+27 \d{2} \d{3} \d{4}$'),
    -- Regex for South African format
    visit_date DATE NOT NULL,
    -- Assuming you want to keep track of visit dates
    visit_type VARCHAR(50) NOT NULL,
    -- e.g., singles, doubles, practice, coaching, etc.
    is_active BOOLEAN DEFAULT TRUE -- Indicates if the visitor is currently active
);
INSERT INTO visitors (
        first_name,
        surname,
        email,
        phone,
        visit_date,
        visit_type,
        is_active
    )
VALUES (
        'Alice',
        'Johnson',
        'alice@example.com',
        '+27 12 345 6780',
        '2024-11-05',
        'singles',
        TRUE
    ),
    (
        'Bob',
        'Williams',
        'bob@example.com',
        '+27 21 937 6540',
        '2024-11-05',
        'doubles',
        falsE
    );
SELECT *
FROM MEMBERS
LIMIT 5;
select *
from visitors v
limit 5;
SELECT *
FROM Courts c
limit 5;
SELECT *
FROM Courts
WHERE has_lights = TRUE;