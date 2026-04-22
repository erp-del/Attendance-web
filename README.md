# Attendance System - Web-Based Online Attendance with Geofencing & Biometric Verification

A comprehensive attendance management system built with modern web technologies, featuring geofencing-based location verification and biometric (selfie) authentication.

## 🎯 Features

### Employee Features
- **Real-time Clock Management**: Clock in/out with precise timestamps
- **GPS Geofencing**: Automatic location verification using HTML5 Geolocation
- **Biometric Verification**: Live selfie capture using device camera
- **Lateness Calculation**: Automatic calculation of minutes late (after 8:00 AM)
- **Location Status**: 
  - In-radius: Automatic approval
  - Out-of-radius: Requires admin approval

### Admin Features
- **Dashboard**: Real-time view of all attendance records
- **Approval System**: Approve/Reject out-of-radius attendance
- **Attendance Analytics**: View clock-in times, lateness, selfies, and locations
- **Selfie Verification**: Preview employee selfies
- **Location Details**: View exact GPS coordinates and distance from office

## 📋 Business Logic

### Office Hours
- **Working Hours**: 08:00 AM - 05:00 PM
- **Late Definition**: Clocking in after 08:00 AM
- **Lateness Calculation**: Exact minutes late are automatically calculated

### Geofencing Rules
- **Office Location**: Central coordinate with configurable radius (default: 50 meters)
- **In-Radius**: Attendance automatically approved
- **Out-of-Radius**: Status set to "Pending Approval" (requires admin review)

### Biometric Verification
- Employees must capture a live selfie before submitting attendance
- Selfie photo stored in Supabase Storage
- Accessible for admin verification

## 🗄️ Database Schema

### User Model
- `id`: Unique identifier
- `name`: User full name
- `email`: Email address (unique)
- `password`: Hashed password (via Supabase)
- `role`: USER or ADMIN
- `createdAt`: Timestamp

### Attendance Model
- `id`: Unique identifier
- `userId`: Foreign key to User
- `clockInTime`: Clock-in timestamp
- `clockOutTime`: Clock-out timestamp (nullable)
- `lat`: Latitude of clock-in location
- `lng`: Longitude of clock-in location
- `locationStatus`: IN_RADIUS or OUT_RADIUS
- `distance`: Distance in meters from office
- `photoUrl`: URL to selfie photo (Supabase Storage)
- `approvalStatus`: APPROVED, PENDING, or REJECTED
- `lateMinutes`: Number of minutes late (0 if on-time)
- `createdAt`: Timestamp

### Office Model
- `id`: Unique identifier (typically single record)
- `name`: Office name
- `lat`: Office latitude
- `lng`: Office longitude
- `radius`: Geofencing radius in meters

## 🚀 Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 14, React, Tailwind CSS |
| Backend | Next.js API Routes |
| Database | PostgreSQL |
| ORM | Prisma |
| Auth & Storage | Supabase |
| Geolocation | HTML5 Geolocation API, geolib |
| Camera | react-webcam |
| Utilities | date-fns, axios, zod |

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ and npm
- PostgreSQL database
- Supabase account

### Steps

1. **Clone and Install**
   ```bash
   cd attendance-system
   npm install
   ```

2. **Configure Environment**
   ```bash
   cp .env.example .env.local
   ```
   Fill in your environment variables:
   - Database URL
   - Supabase credentials
   - Office geofencing coordinates

3. **Initialize Database**
   ```bash
   npx prisma migrate dev
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000)

## 🔄 Development Phases

### PHASE 1: Project Initialization ✓
- [x] Next.js 14 setup with App Router
- [x] Install all dependencies
- [x] Create folder structure
- [x] Environment configuration

### PHASE 2: Prisma Schema & Supabase Connection
- [ ] Create Prisma schema (User, Attendance, Office)
- [ ] Set up Supabase connection
- [ ] Database migrations
- [ ] Supabase Auth integration

### PHASE 3: API Routes - Geofencing & Lateness Logic
- [ ] Attendance clock-in/out endpoints
- [ ] Haversine formula for distance calculation
- [ ] Geofencing logic
- [ ] Lateness calculation
- [ ] Office configuration endpoints
- [ ] Admin approval endpoints

### PHASE 4: Employee Frontend UI
- [ ] Login page
- [ ] Employee dashboard
- [ ] Real-time clock display
- [ ] GPS location component
- [ ] Live camera/selfie component
- [ ] Clock-in form with validation

### PHASE 5: Admin Dashboard UI
- [ ] Admin login
- [ ] Attendance table with sorting/filtering
- [ ] Selfie photo preview
- [ ] Approve/Reject buttons
- [ ] Location details view
- [ ] Analytics and reports

## 📝 API Endpoints (to be implemented)

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### Attendance
- `POST /api/attendance/clock-in` - Clock in with selfie
- `POST /api/attendance/clock-out` - Clock out
- `GET /api/attendance/today` - Get today's records
- `GET /api/attendance/pending` - Get pending approvals (Admin)
- `PATCH /api/attendance/:id/approve` - Approve attendance (Admin)
- `PATCH /api/attendance/:id/reject` - Reject attendance (Admin)

### Office
- `GET /api/office` - Get office configuration
- `PATCH /api/office` - Update office configuration (Admin)

## 📄 License

This project is for demonstration purposes.
