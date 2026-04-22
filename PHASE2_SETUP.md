# PHASE 2: Prisma Schema & Supabase Setup - COMPLETE ✓

## What Was Created

### 1. **Prisma Schema** (`prisma/schema.prisma`)
Three main models defined:

#### **User Model**
```prisma
- id (CUID, Primary Key)
- name (String)
- email (Unique)
- password (Hashed)
- role (USER or ADMIN)
- attendances (Relation to Attendance records)
- createdAt, updatedAt (Timestamps)
```

#### **Attendance Model**
```prisma
- id (CUID, Primary Key)
- userId (Foreign Key → User)
- clockInTime, clockOutTime (DateTime)
- lat, lng (GPS coordinates of clock-in)
- distance (meters from office)
- locationStatus (IN_RADIUS or OUT_RADIUS)
- photoUrl (Supabase storage URL)
- approvalStatus (APPROVED, PENDING, REJECTED)
- lateMinutes (calculated lateness)
- Indexes for: userId, createdAt, approvalStatus
```

#### **Office Model**
```prisma
- id (CUID, Primary Key)
- name (Office name)
- lat, lng (Office coordinates)
- radius (Geofencing radius in meters, default: 50)
```

#### **Enums Defined**
- `UserRole`: USER, ADMIN
- `LocationStatus`: IN_RADIUS, OUT_RADIUS
- `ApprovalStatus`: APPROVED, PENDING, REJECTED

### 2. **Database Connection** (`src/lib/prisma.ts`)
- Singleton Prisma Client instance
- Prevents connection pooling issues in serverless
- Reused across API routes

### 3. **Supabase Client** (`src/lib/supabase.ts`)
- Frontend Supabase client (public key)
- Admin client for server-side operations

### 4. **Authentication Utilities** (`src/lib/auth.ts`)
Functions implemented:
- `registerUser()` - Create user in Supabase Auth + PostgreSQL
- `loginUser()` - Authenticate and get session
- `getCurrentSession()` - Get current auth session
- `logoutUser()` - Sign out user
- `verifyUserToken()` - Get authenticated user data
- `isUserAdmin()` - Check if user has admin role

### 5. **Attendance Utilities** (`src/lib/attendance.ts`)
Functions implemented:
- `calculateDistance()` - Haversine formula via geolib
- `isWithinGeofence()` - Check if within office radius
- `calculateLateMinutes()` - Calculate lateness from 8 AM start time
- `isWithinOfficeHours()` - Check if time is during work hours
- `getMinutesUntilOfficeClose()` - Time until 5 PM
- `formatMinutesToReadable()` - User-friendly lateness display
- Date utility functions (today range, same day check)

### 6. **Storage Utilities** (`src/lib/storage.ts`)
Functions implemented:
- `uploadAttendancePhoto()` - Upload selfie to Supabase Storage
- `deleteAttendancePhoto()` - Remove old photos
- `getAttendancePhotoUrl()` - Get public URL to photo

---

## 🔧 SETUP INSTRUCTIONS

### Step 1: Set Up PostgreSQL Database

**Option A: Local PostgreSQL**
```bash
# Windows: Download from https://www.postgresql.org/download/windows/
# Create a database
createdb attendance_db

# Get connection string
postgresql://username:password@localhost:5432/attendance_db
```

**Option B: Hosted PostgreSQL (Recommended)**
- Use Railway, Vercel Postgres, or AWS RDS
- Get connection string from provider
- Should look like: `postgresql://user:pass@host:port/dbname`

### Step 2: Set Up Supabase (FREE)

1. **Create Supabase Project**
   - Go to https://supabase.com
   - Click "New Project"
   - Enter project name, password, region
   - Wait for provisioning (~3 minutes)

2. **Get Credentials**
   - Go to Project Settings → API
   - Copy:
     - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
     - `anon public key` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - `service_role key` → `SUPABASE_SERVICE_ROLE_KEY`

3. **Create Storage Bucket** (for selfies)
   - Go to Storage → Create New Bucket
   - Name: `attendance-photos`
   - Set to **Public** (so photos are accessible)
   - Create bucket

4. **Get PostgreSQL Connection String**
   - Go to Project Settings → Database
   - Copy connection string
   - Or use Supabase's PostgreSQL directly (recommended)

### Step 3: Update Environment Variables

Edit `.env.local`:

```env
# PostgreSQL (Use Supabase PostgreSQL URL)
DATABASE_URL="postgresql://username:password@db.supabasehost.com:5432/postgres"

# Supabase Credentials
NEXT_PUBLIC_SUPABASE_URL="https://xxx.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJ..."
SUPABASE_SERVICE_ROLE_KEY="eyJ..."

# JWT Secret (Change this in production!)
JWT_SECRET="your-super-secret-jwt-key-change-in-production"

# Office Geofencing Config (Set your office location)
# Example: New York City
NEXT_PUBLIC_OFFICE_LAT="40.7128"
NEXT_PUBLIC_OFFICE_LNG="-74.0060"
NEXT_PUBLIC_OFFICE_RADIUS="50"  # meters

NODE_ENV="development"
```

### Step 4: Run Database Migration

```bash
# Create and run migrations
npx prisma migrate dev --name init

# This will:
# 1. Create the three tables (users, attendances, offices)
# 2. Generate migration file
# 3. Apply migration to database
```

### Step 5: Seed Initial Data (Optional)

To add a test office record:

```bash
npx prisma db seed
```

Or manually add via Prisma Studio:

```bash
npx prisma studio
```

Then create an Office record with your coordinates.

---

## 📂 File Structure After Phase 2

```
src/
  lib/
    prisma.ts          ✓ Database client
    supabase.ts        ✓ Auth client
    auth.ts            ✓ Auth functions
    attendance.ts      ✓ Geofencing & lateness logic
    storage.ts         ✓ Photo upload/delete
  types/
    index.ts           ✓ Type definitions
  utils/
    api-response.ts    ✓ API helpers
    constants.ts       ✓ Constants
  
prisma/
  schema.prisma        ✓ Database schema
  migrations/          ✓ Auto-generated
```

---

## ✅ Verification Checklist

After setup, verify everything works:

```bash
# 1. Check Prisma schema is valid
npx prisma validate

# 2. Open Prisma Studio to see database
npx prisma studio

# 3. Run development server
npm run dev

# 4. Test database connection in browser console:
# Open http://localhost:3000
# Open DevTools → Console
# If Database_URL is correct, app should start without errors
```

You should see:
- Database tables created: `users`, `attendances`, `offices`
- Office geofencing config saved
- No connection errors in terminal

---

## 🚨 Troubleshooting

### Error: "Too many connections"
**Solution**: Increase PostgreSQL connection limit or use connection pooling

### Error: "Missing Supabase credentials"
**Solution**: 
- Verify all env variables are in `.env.local`
- Reload dev server after changing env

### Error: "Bucket not found"
**Solution**: 
- Create `attendance-photos` bucket in Supabase Storage
- Make sure it's set to **Public**

### Error: "Unable to verify JWT token"
**Solution**: 
- Check `SUPABASE_SERVICE_ROLE_KEY` is correct
- Should NOT be the public key

---

## 📝 Database Relationships

```
User (1) ──→ (Many) Attendance
└─ id ────────→ userId

Office (1) ──→ (Many) Attendance  [through coordinates]
└─ lat, lng ─→ lat, lng
```

---

## 🎯 Next Steps - PHASE 3

Create API Routes:
1. **POST /api/attendance/clock-in** - Record clock-in with geofencing
2. **POST /api/attendance/clock-out** - Record clock-out
3. **GET /api/attendance/today** - Get today's records
4. **GET /api/attendance/pending** - Get pending approvals (Admin)
5. **PATCH /api/attendance/:id/approve** - Admin approve
6. **PATCH /api/attendance/:id/reject** - Admin reject
7. **GET /api/office** - Get office config
8. **PATCH /api/office** - Update office config (Admin)
9. **POST /api/auth/register** - User registration
10. **POST /api/auth/login** - User login

---

## 💾 Database CLI Commands

```bash
# View database GUI
npx prisma studio

# Create new migration
npx prisma migrate dev --name add_new_field

# Reset database (⚠️ DELETE ALL DATA)
npx prisma migrate reset

# Generate schema from existing database
npx prisma introspect

# Format schema file
npx prisma format

# Validate schema
npx prisma validate
```

---

**PHASE 2 is now complete!** 🎉

Database is ready. All utilities for authentication, geofencing, and attendance are implemented.

**Ready to proceed to PHASE 3?** We'll create all the API routes!
