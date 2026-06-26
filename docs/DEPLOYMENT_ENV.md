# Production setup — email OTP login + email reminders

One service (**Resend**) handles login codes and daily goal reminders.

---

## Overview

| What | How |
|------|-----|
| Login | Email + 6-digit OTP (Resend) |
| Daily reminders | Same Resend account |
| Cron | cron-job.org (free) |

**User flow:** Log in once with email OTP → set reminder time in Settings → bell ON on goals → emails handle the rest.

---

## Render — API environment

Remove if still present: `MSG91_AUTH_KEY`, `MSG91_SENDER_ID`, `GOOGLE_*`, `EMAIL_USER`, `EMAIL_PASS`, `ADMIN_PHONE`

| Variable | Value |
|----------|--------|
| `MONGO_URI` | MongoDB Atlas connection string |
| `JWT_SECRET` | Long random string |
| `RESEND_API_KEY` | From [resend.com](https://resend.com/api-keys) |
| `EMAIL_FROM` | `Learning Tracker <onboarding@resend.dev>` |
| `OTP_MOCK` | `false` in production |
| `CRON_SECRET` | `openssl rand -hex 32` |
| `REMINDER_TIMEZONE` | `Asia/Kolkata` |
| `FRONTEND_URL` | `https://learning-tracker-two-xi.vercel.app` |
| `ADMIN_EMAIL` | Your admin email |

Verify: `https://learning-tracker-api-hqzm.onrender.com/api/health` → `"emailProvider":"resend"`

---

## Vercel — frontend

| Variable | Value |
|----------|--------|
| `VITE_API_BASE_URL` | `https://learning-tracker-api-hqzm.onrender.com/api` |

Remove: `VITE_GOOGLE_CLIENT_ID`

---

## cron-job.org (reminders)

Every **5 minutes**, GET:

```
https://learning-tracker-api-hqzm.onrender.com/api/cron/reminders?secret=YOUR_CRON_SECRET
```

---

## Local development

```bash
# server/.env
OTP_MOCK=true          # login OTP in terminal
RESEND_API_KEY=re_...  # optional — real emails when set
```

```bash
cd server && npm run dev
cd client && npm run dev
```

---

## Checklist

- [ ] Render: `RESEND_API_KEY`, `EMAIL_FROM`, `OTP_MOCK=false`
- [ ] Removed MSG91 / Google vars from Render
- [ ] Vercel: `VITE_API_BASE_URL` only, redeployed
- [ ] Login with email OTP works
- [ ] Reminder time saved in Settings
- [ ] Bell ON on daily goals
- [ ] cron-job.org returning 200

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| No login OTP email | Check `RESEND_API_KEY`, spam folder. Use `OTP_MOCK=true` and read Render logs. |
| No reminder emails | Reminder time + bell ON + `CRON_SECRET` on cron-job.org |
| Old phone accounts | Re-register with email — old phone users cannot log in |
