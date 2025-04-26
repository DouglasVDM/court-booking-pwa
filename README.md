# Tennis Club Court Booking App

Welcome to the **Tennis Club Court Booking App** repository! This application simplifies court bookings for members and is designed with future visitor functionality in mind. The app is a Progressive Web App (PWA) built with React and TypeScript, featuring a secure backend API powered by Express and PostgreSQL.

---

## Table of Contents

- [Tennis Club Court Booking App](#tennis-club-court-booking-app)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Features](#features)
  - [Tech Stack](#tech-stack)
  - [Setup Instructions](#setup-instructions)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
  - [Application Screenshot](#application-screenshot)
    - [A quick diagram showing how the new protected routing flow works now.](#a-quick-diagram-showing-how-the-new-protected-routing-flow-works-now)
  - [Mermaid Diagrams](#mermaid-diagrams)
    - [Member Login and Validation](#member-login-and-validation)
    - [Future Visitor Flow](#future-visitor-flow)
    - [Booking Flow](#booking-flow)
    - [Payment Flow](#payment-flow)
  - [PWA Features](#pwa-features)
  - [Future Enhancements](#future-enhancements)
  - [License](#license)

---

## Overview
The Tennis Club Court Booking App allows:
- **Members** to securely book courts via their accounts.
- **Admins** to manage members and bookings.
- **Future Visitors** to book courts and pay online.

---

## Features
- Member authentication via **Auth0**.
- CRUD operations for members and bookings.
- Prevention of overlapping bookings.
- Progressive Web App (PWA) capabilities for offline access.
- Admin features for adding and validating member details.
- Database designed for scalability, including future visitor functionality.

---

## Tech Stack
- **Frontend:** React, TypeScript, Vite, React-Bootstrap.
- **Backend:** Node.js, Express, PostgreSQL.
- **Authentication:** Auth0.
- **Deployment:** Docker for PostgreSQL, flexible hosting options.
- **PWA:** Service workers for offline capability and a responsive, mobile-first design.

---

## Setup Instructions

### Prerequisites
- Node.js v18+ and npm.
- PostgreSQL v14+.
- Docker Desktop (for database setup).

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/tennis-club-booking.git
   cd tennis-club-booking
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   - Copy `.env.example` to `.env`.
   - Add your PostgreSQL, Auth0, and other required credentials.

4. Start the backend server:
   ```bash
   npm run start:server
   ```

5. Start the frontend development server:
   ```bash
   npm run start:client
   ```

6. Access the application at [http://localhost:3000](http://localhost:3000).

---

## Application Screenshot

### A quick diagram showing how the new protected routing flow works now.
![A quick diagram showing how the new protected routing flow works now.](./frontend/src/assets//protected-routing-flow.png)

---

## Mermaid Diagrams

### Member Login and Validation
```mermaid
graph TD
    A[Start: Member Login via Auth0] --> B{Is User Authenticated?}
    B -- Yes --> C[Check Email Against Members Table]
    B -- No --> Z[Authentication Failed: Deny Access]
    C --> D{Email Exists in Members Table?}
    D -- Yes --> E[Grant Access to Member Dashboard]
    D -- No --> F{Is Visitor Booking Allowed?}
    F -- Yes --> G[Create Temporary Visitor Record]
    G --> H[Grant Limited Access for Visitor Booking]
    F -- No --> I[Deny Access]
    E --> J[Successful Login Completed]
    H --> J
    Z --> K[End]
    I --> K
    J --> K[End]
```

### Future Visitor Flow
```mermaid
graph TD
    A[Start: Visitor Signup/Login] --> B{Authenticated via Auth0?}
    B -- Yes --> C[Check Visitor Email Against Visitors Table]
    B -- No --> Z[Authentication Failed: Deny Access]
    C --> D{Visitor Email Exists?}
    D -- Yes --> E[Grant Limited Access]
    D -- No --> F[Create New Visitor Record]
    F --> E
    E --> G[Proceed to Visitor Booking]
    G --> H[Payment Confirmation]
    H --> I[Successful Booking]
    Z --> K[End]
    I --> K[End]
```

### Booking Flow
```mermaid
graph TD
    A[Start: Booking Request] --> B{User Type?}
    B -- Member --> C[Check Membership Validity]
    B -- Visitor --> D[Check Payment Status]
    C --> E{Membership Valid?}
    E -- Yes --> F[Check Court Availability]
    E -- No --> Z[Deny Booking: Invalid Membership]
    D --> G{Payment Completed?}
    G -- Yes --> F
    G -- No --> Z[Deny Booking: Payment Incomplete]
    F --> H{Court Available?}
    H -- Yes --> I[Create Booking]
    H -- No --> Z[Deny Booking: Court Unavailable]
    I --> J[Send Confirmation]
    J --> K[End]
    Z --> K[End]
```

### Payment Flow
```mermaid
graph TD
    A[Start: Booking Request] --> B[Select Court, Date, Time]
    B --> C[Calculate Total Cost]
    C --> D[Present Payment Gateway]
    D --> E{Payment Successful?}
    E -- Yes --> F[Confirm Booking]
    F --> G[Send Booking Confirmation Email]
    E -- No --> Z[Cancel Booking Process]
    G --> H[End]
    Z --> H
```

---

## PWA Features
- **Offline Mode:** Service workers cache key assets.
- **Installable:** Add to home screen on mobile devices.
- **Responsive Design:** Optimized for desktop, tablet, and mobile.

---

## Future Enhancements
- Enable **visitor bookings** with online payment integration.
- Advanced analytics for court usage.
- Notifications for upcoming bookings.

---

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.
