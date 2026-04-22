# Quick Supabase & PostgreSQL Configuration Guide

## 🚀 Quick Setup (5 Minutes)

### Using Supabase (RECOMMENDED - Simplest!)

1. **Create Project**
   - Visit https://supabase.com
   - Sign up (free)
   - New Project → Set name, password, region
   - Wait ~3 min for provisioning

2. **Copy Your Credentials**
   ```
   Settings → API
   - Copy Project URL → NEXT_PUBLIC_SUPABASE_URL
   - Copy anon key → NEXT_PUBLIC_SUPABASE_ANON_KEY
   - Copy service_role key → SUPABASE_SERVICE_ROLE_KEY
   ```

3. **Set PostgreSQL Connection String**
   ```
   Settings → Database → Connection Pooling
   - Copy pooled connection string → DATABASE_URL
   - Format: postgresql://postgres:password@...
   ```

4. **Create Storage Bucket**
   ```
   Storage → New Bucket
   - Name: attendance-photos
   - Mark: Public
   - Create
   ```

5. **Update `.env.local`**
   ```env
   DATABASE_URL="postgresql://..."
   NEXT_PUBLIC_SUPABASE_URL="https://xxx.supabase.co"
   NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJ..."
   SUPABASE_SERVICE_ROLE_KEY="eyJ..."
   NEXT_PUBLIC_OFFICE_LAT="40.7128"
   NEXT_PUBLIC_OFFICE_LNG="-74.0060"
   NEXT_PUBLIC_OFFICE_RADIUS="50"
   JWT_SECRET="any-secret-key-here"
   NODE_ENV="development"
   ```

6. **Run Migration**
   ```bash
   npx prisma migrate dev --name init
   ```

7. **Done!** 🎉

---

## Alternative: Using Local PostgreSQL

```bash
# Install PostgreSQL
# Windows: https://www.postgresql.org/download/windows/

# Create database
createdb attendance_db

# Set in .env.local:
DATABASE_URL="postgresql://postgres:password@localhost:5432/attendance_db"

# Run migration
npx prisma migrate dev --name init
```

---

## Verify Setup

```bash
# Open database GUI
npx prisma studio

# Should show three empty tables: users, attendances, offices
```

---

## Created Files Summary

| File | Purpose |
|------|---------|
| `prisma/schema.prisma` | Database schema (Users, Attendance, Office) |
| `src/lib/prisma.ts` | Prisma client singleton |
| `src/lib/supabase.ts` | Supabase auth & storage client |
| `src/lib/auth.ts` | Login/register functions |
| `src/lib/attendance.ts` | Geofencing & lateness calculations |
| `src/lib/storage.ts` | Photo upload utilities |

---

## Ready for PHASE 3?

API routes are next! You'll be able to:
- Clock in/out ✓
- Upload selfies ✓
- Automatic geofencing ✓
- Admin approvals ✓
