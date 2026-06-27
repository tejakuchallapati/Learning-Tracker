# Launch guide — Learning Tracker

**Auth:** Email OTP (Brevo) · **Reminders:** Brevo · **300 emails/day free**

---

## User flow

1. Log in → email → OTP → dashboard (stays signed in)
2. Settings → reminder time + email
3. Daily Goals → bell **ON**
4. Reminder emails at scheduled time

---

## Brevo setup

1. [app.brevo.com](https://app.brevo.com) → **Senders** → verify sender email
2. **SMTP & API** → **API keys** → generate → copy `xkeysib-...` (once)

---

## Render environment (API)

| Variable | Value |
|----------|--------|
| `BREVO_API_KEY` | `xkeysib-...` |
| `EMAIL_FROM` | `Learning Tracker <teja26kt@gmail.com>` |
| `MONGO_URI` | MongoDB Atlas URI |
| `JWT_SECRET` | Random secret |
| `CRON_SECRET` | Random secret |
| `FRONTEND_URL` | `https://learning-tracker-two-xi.vercel.app` |
| `REMINDER_TIMEZONE` | `Asia/Kolkata` |
| `ADMIN_EMAIL` | Your admin email |
| `NODE_ENV` | `production` |
| `PORT` | `5001` |
| `OTP_MOCK` | `false` |

**Health:** `https://learning-tracker-api-hqzm.onrender.com/api/health` → `"emailProvider":"brevo"`

**Do not add:** `RESEND_*`, `MSG91_*`, `GOOGLE_*`, `EMAIL_USER`, `EMAIL_PASS`, `ADMIN_PHONE`

---

## Vercel environment (frontend)

| Variable | Value |
|----------|--------|
| `VITE_API_BASE_URL` | `https://learning-tracker-api-hqzm.onrender.com/api` |

Must be the **full https URL** — not `/api`, not the Vercel site URL.

Optional: `VITE_GA_MEASUREMENT_ID`

**Do not add:** `VITE_GOOGLE_CLIENT_ID`

Redeploy after changes.

---

## cron-job.org (reminders)

Every 5 minutes, GET:

```
https://learning-tracker-api-hqzm.onrender.com/api/cron/reminders?secret=YOUR_CRON_SECRET
```

---

## Local dev (`server/.env`)

```
BREVO_API_KEY=xkeysib-...
EMAIL_FROM=Learning Tracker <teja26kt@gmail.com>
MONGO_URI=...
JWT_SECRET=...
OTP_MOCK=true
```

---

## Pre-launch test

- [ ] `/api/health` → brevo
- [ ] Login with any email → OTP arrives
- [ ] Settings → reminder time saved
- [ ] Goals → bell ON
- [ ] cron-job.org returns 200

---

## Unused services (safe to delete accounts)

Resend, MSG91, Google Cloud OAuth — not used by this app anymore.
