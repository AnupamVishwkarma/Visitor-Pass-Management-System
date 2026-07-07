# Visitor Pass Management System

MERN based visitor pass management app for registering visitors, approving appointments, generating QR/PDF passes, and handling QR based check-in/check-out.

## Features

- JWT login with roles: admin, security, employee, visitor
- Visitor registration with photo upload
- Appointment creation, approval, and rejection
- QR code and PDF badge generation
- QR scanner check-in/check-out flow
- Single-use passes: checkout expires the pass
- Dashboard stats
- CSV reports for visitors, appointments, and passes
- Admin staff management
- Visitor pre-registration and visitor-only pass view
- Optional email notifications with SMTP

## Setup

### Backend

```bash
cd backend
npm install
```

Create `backend/.env`:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/visitor-pass-management
JWT_SECRET=replace_with_a_secret

# Optional email notifications
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
EMAIL_FROM=
```

Run backend:

```bash
npm run dev
```

Seed demo data:

```bash
npm run seed
```

Demo passwords:

- `admin@example.com` / `password123`
- `security@example.com` / `password123`
- `employee@example.com` / `password123`
- `visitor@example.com` / `password123`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Open the Vite URL shown in the terminal.

## Main Workflows

1. Login as admin or employee.
2. Add a visitor with details and optional photo.
3. Create an appointment for the visitor.
4. Approve the appointment.
5. Generate a pass.
6. Open the QR scanner as admin/security.
7. Scan once to check in.
8. Scan again to check out and expire the pass.

Visitor workflow:

1. Login as `visitor@example.com`.
2. Submit pre-registration from the Pre-Register page.
3. Open Passes to view passes linked to the visitor email.

## Reports

Admin can export:

- Visitors CSV with search
- Appointments CSV with status/date filters
- Passes CSV with status filter

## Notes

- Camera access usually requires localhost or HTTPS.
- Email notification is skipped if SMTP values are not configured.
- Uploaded visitor photos are served from `/uploads`.
- Generated pass PDFs are served from `/pdfs`.
