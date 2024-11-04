drop table members ;

CREATE TABLE members (
    member_id serial PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    surname VARCHAR(100) NOT NULL,  -- Changed from email to surname
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20) CHECK (phone ~ '^\+27 \d{2} \d{3} \d{4}$'),  -- Enforces ZA format
    membership_start DATE,
    membership_end DATE,
    is_admin BOOLEAN DEFAULT FALSE,  -- Indicates if the member has admin privileges
    admin_role VARCHAR(50),           -- Role of the member if they are an admin
    is_active BOOLEAN DEFAULT TRUE     -- Indicates if the member is active
);

-- Members data with ZA format phone numbers
INSERT INTO members (first_name, surname, email, phone, membership_start, membership_end, is_admin, admin_role) VALUES
('John', 'Doe', 'john@example.com', '+27 12 345 6789', '2023-01-01', '2024-01-01', FALSE, NULL),
('Jane', 'Smith', 'jane@example.com', '+27 12 456 6789', '2023-02-01', '2024-02-01', TRUE, 'Manager');

--

drop table visitors ;

CREATE TABLE visitors (
    visitor_id SERIAL PRIMARY KEY,      -- Use SERIAL for auto-increment
    first_name VARCHAR(100) NOT NULL,
    surname VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20) CHECK (phone ~ '^\+27 \d{2} \d{3} \d{4}$'), -- Regex for South African format
    visit_date DATE NOT NULL,           -- Assuming you want to keep track of visit dates
    visit_type VARCHAR(50) NOT NULL,    -- e.g., singles, doubles, practice, coaching, etc.
    is_active BOOLEAN DEFAULT TRUE       -- Indicates if the visitor is currently active
);

INSERT INTO visitors (first_name, surname, email, phone, visit_date, visit_type, is_active) VALUES
('Alice', 'Johnson', 'alice@example.com', '+27 12 345 6780', '2024-11-05', 'singles', TRUE),
('Bob', 'Williams', 'bob@example.com', '+27 21 937 6540', '2024-11-05', 'doubles', falsE);

SELECT * FROM MEMBERS LIMIT 5;
select * from visitors v limit 5 ;
-- 













CREATE TABLE Visitors (
    visitor_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    phone VARCHAR(20),
    visit_date DATE DEFAULT CURRENT_DATE,    -- Date of the visitor’s visit
    purpose VARCHAR(255)                     -- Purpose of visit (e.g., "Trial session", "Event")
);

-- Visitors data
INSERT INTO Visitors (first_name, email, phone, purpose) VALUES
('Visitor One', 'visitor1@example.com', '555-7777', 'Trial session'),
('Visitor Two', 'visitor2@example.com', NULL, 'Event');


CREATE TABLE Courts (
    court_id INT PRIMARY KEY AUTO_INCREMENT,
    court_first_name VARCHAR(50) NOT NULL
);

INSERT INTO Courts (court_first_name) VALUES
('Court 1'),
('Court 2'),
('Court 3'),
('Court 4');


CREATE TABLE Court_Availability (
    id INT PRIMARY KEY AUTO_INCREMENT,
    member_id INT,                  -- ID of the member (e.g., 123)
    court_id INT,                   -- ID of the court for unique identification
    date DATE,                      -- Date of availability (e.g., '2023-06-05')
    start_time TIME,                -- Start time of the available slot (e.g., '09:00:00')
    end_time TIME,                  -- End time of the available slot (e.g., '11:30:00')
    duration DECIMAL(3,1),          -- Duration of the booking in hours (e.g., 2.5)
    CONSTRAINT chk_duration CHECK (duration BETWEEN 0.5 AND 3.0) -- Ensures duration is between 0.5 and 3 hours
);

CREATE TABLE Court_Availability (
    id INT PRIMARY KEY AUTO_INCREMENT,
    member_id INT,                  
    court_id INT,                   
    date DATE,                      
    start_time TIME,                
    end_time TIME,                  
    duration DECIMAL(3,1),          
    CONSTRAINT fk_member FOREIGN KEY (member_id) REFERENCES Members(member_id),
    CONSTRAINT fk_court FOREIGN KEY (court_id) REFERENCES Courts(court_id),
    CONSTRAINT chk_duration CHECK (duration BETWEEN 0.5 AND 3.0)
);

INSERT INTO Court_Availability (member_id, court_id, date, start_time, end_time, duration) VALUES
(123, 1, '2023-06-05', '09:00:00', '11:30:00', 2.5),
(123, 1, '2023-06-05', '14:00:00', '16:00:00', 2.0),
(123, 2, '2023-06-06', '10:00:00', '12:30:00', 2.5),
(123, 2, '2023-06-06', '16:30:00', '18:00:00', 1.5),
-- Add other sample rows here as needed


CREATE TABLE Special_Offerings (
    offering_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2),
    start_date DATE,
    end_date DATE,
    is_active BOOLEAN DEFAULT TRUE
);
