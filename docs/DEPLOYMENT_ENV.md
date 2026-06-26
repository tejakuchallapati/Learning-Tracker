# Production setup — email OTP login + email reminders (Brevo)

**Brevo free tier:** 300 emails/day · send to **any** email · no domain purchase needed.

---

## Step 1 — Brevo setup (one time)

1. Log in at [app.brevo.com](https://app.brevo.com)
2. **Senders & IP** → add and verify **`teja26kt@gmail.com`** (click link in inbox)
3. **SMTP & API** → **API keys** → create key → copy it

---

## Step 2 — Render environment

**Add:**

| Variable | Value |
|----------|--------|
| `BREVO_API_KEY` | Your Brevo API key (`xkeysib-...`) |
| `EMAIL_FROM` | `Learning Tracker <teja26kt@gmail.com>` |
| `OTP_MOCK` | `false` |

**Remove** (no longer needed):

- `RESEND_API_KEY`
- `MSG91_AUTH_KEY`, `MSG91_SENDER_ID`
- `GOOGLE_*`

**Keep:** `MONGO_URI`, `JWT_SECRET`, `CRON_SECRET`, `FRONTEND_URL`, `REMINDER_TIMEZONE`, `ADMIN_EMAIL`, `NODE_ENV`, `PORT`

Save → Render redeploys.

---

## Step 3 — Verify

```
https://learning-tracker-api-hqzm.onrender.com/api/health
```

Expected: `{"ok":true,"emailProvider":"brevo"}`

---

## Step 4 — Test login (any email)

1. `/login` → enter **any** Gmail (e.g. `teja262005@gmail.com`)
2. **Send OTP** → check inbox
3. Settings → reminder time → bell ON on goals

---

## Vercel

| Variable | Value |
|----------|--------|
| `VITE_API_BASE_URL` | `https://learning-tracker-api-hqzm.onrender.com/api` |

---

## cron-job.org

Every 5 min, GET:

```
https://learning-tracker-api-hqzm.onrender.com/api/cron/reminders?secret=YOUR_CRON_SECRET
```

---

## Local dev

```bash
# server/.env
BREVO_API_KEY=xkeysib-...
EMAIL_FROM=Learning Tracker <teja26kt@gmail.com>
OTP_MOCK=true   # optional — OTP in terminal instead of email
```

---

## Checklist

- [ ] Brevo sender `teja26kt@gmail.com` verified
- [ ] Render: `BREVO_API_KEY` + `EMAIL_FROM` + `OTP_MOCK=false`
- [ ] Removed `RESEND_API_KEY` from Render
- [ ] `/api/health` shows `"emailProvider":"brevo"`
- [ ] Login OTP works for any email
- [ ] Reminder time + bell ON + cron-job.org

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Sender not verified | Brevo → Senders → verify `teja26kt@gmail.com` |
| OTP fails | Check `BREVO_API_KEY`, `EMAIL_FROM` matches verified sender |
| 300/day limit hit | Brevo free cap — enough for small app; upgrade later if needed |
| Cold start timeout | Wake API via `/api/health` first, wait up to 60s on login |
