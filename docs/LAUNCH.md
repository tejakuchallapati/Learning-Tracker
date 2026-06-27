# Launch checklist — Learning Tracker

**One auth flow:** Email OTP login (Brevo) · **One email service:** Brevo · **Reminders:** same Brevo account.

---

## What users do

1. **Log in** → email → OTP in inbox → dashboard (stays signed in)
2. **Settings** → reminder time + reminder email
3. **Daily Goals** → bell **ON** on goals
4. **Emails** arrive at reminder time for incomplete goals

---

## Brevo (one-time, free)

1. [app.brevo.com](https://app.brevo.com) → **Senders** → verify `teja26kt@gmail.com`
2. **SMTP & API** → **API keys** tab → **Generate** → copy full `xkeysib-...` key (shown once)

---

## Render — KEEP only these

| Variable | Value |
|----------|--------|
| `BREVO_API_KEY` | `xkeysib-...` (from API keys tab, not SMTP) |
| `EMAIL_FROM` | `Learning Tracker <teja26kt@gmail.com>` |
| `MONGO_URI` | MongoDB Atlas connection string |
| `JWT_SECRET` | Long random string |
| `CRON_SECRET` | Long random string |
| `FRONTEND_URL` | `https://learning-tracker-two-xi.vercel.app` |
| `REMINDER_TIMEZONE` | `Asia/Kolkata` |
| `ADMIN_EMAIL` | `teja26kt@gmail.com` |
| `NODE_ENV` | `production` |
| `PORT` | `5001` |
| `OTP_MOCK` | `false` |

## Render — DELETE these (old experiments)

| Remove | Why |
|--------|-----|
| `RESEND_API_KEY` | Replaced by Brevo |
| `MSG91_AUTH_KEY` | Phone SMS removed |
| `MSG91_SENDER_ID` | Phone SMS removed |
| `GOOGLE_CLIENT_ID` | Google login removed |
| `GOOGLE_CLIENT_SECRET` | Google login removed |
| `EMAIL_USER` | Old Gmail SMTP |
| `EMAIL_PASS` | Old Gmail SMTP |
| `ADMIN_PHONE` | Phone auth removed |

**Health check:** `https://learning-tracker-api-hqzm.onrender.com/api/health`  
→ `{"ok":true,"emailProvider":"brevo"}`

---

## Vercel — KEEP only these

| Variable | Value |
|----------|--------|
| `VITE_API_BASE_URL` | `https://learning-tracker-api-hqzm.onrender.com/api` |

Optional: `VITE_GA_MEASUREMENT_ID`

## Vercel — DELETE

| Remove |
|--------|
| `VITE_GOOGLE_CLIENT_ID` |

**Redeploy** after env changes.

---

## cron-job.org (free reminders)

Every **5 minutes**, GET:

```
https://learning-tracker-api-hqzm.onrender.com/api/cron/reminders?secret=YOUR_CRON_SECRET
```

---

## Accounts you can ignore now

| Service | Status |
|---------|--------|
| **Resend** | Not used — remove API key from Render |
| **MSG91** | Not used — delete account optional |
| **Google Cloud OAuth** | Not used — delete OAuth client optional |

---

## Test before sharing the site

1. Wake API: open `/api/health` in browser
2. Login with any email → OTP arrives
3. Settings → save reminder time
4. Goals → bell ON → create incomplete goal
5. Browser: `.../api/cron/reminders?secret=CRON_SECRET` → `ok: true`

---

## If login OTP fails

| Error | Fix |
|-------|-----|
| `Key not found` | New `xkeysib-` key from Brevo **API keys** tab → Render `BREVO_API_KEY` |
| Timeout / waking up | Open `/api/health` first, wait 60s on login |
| No email in inbox | Check spam; sender must be verified in Brevo |

---

## Limits (free tier)

- **Brevo:** 300 emails/day (login + reminders combined)
- **Render:** sleeps after 15 min idle — first request may take ~30s
