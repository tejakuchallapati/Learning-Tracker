# Production environment variables

Set these in **Vercel** (frontend) and **Render** (API) before launch.  
Reminders use **cron-job.org** (free) — see below.

---

## Vercel — Project → Settings → Environment Variables

Apply to **Production**, **Preview**, and **Development**.

| Variable | Value | Required |
|----------|--------|----------|
| `VITE_API_BASE_URL` | `https://learning-tracker-api-hqzm.onrender.com/api` | Yes |
| `VITE_GOOGLE_CLIENT_ID` | Same as `GOOGLE_CLIENT_ID` in `server/.env` | Yes |
| `VITE_GA_MEASUREMENT_ID` | Your GA4 ID, e.g. `G-XXXXXXXXXX` | Optional |

**After saving:** Deployments → … → **Redeploy** (env vars only apply on new builds).

**Vercel build settings**

| Setting | Value |
|---------|--------|
| Root Directory | `client` |
| Build Command | `npm run build` |
| Output Directory | `dist` |

---

## Render — Web service (`learning-tracker-api`)

Dashboard → your API service → **Settings** → confirm **URL** is  
`https://learning-tracker-api-hqzm.onrender.com` (not an old `ko02` or other slug).

Then → **Environment**.

| Variable | Value | Required |
|----------|--------|----------|
| `NODE_ENV` | `production` | Yes |
| `PORT` | `5001` | Yes |
| `MONGO_URI` | MongoDB Atlas connection string (from `server/.env`) | Yes |
| `JWT_SECRET` | Long random string — **use a new secret for production**, not the dev default | Yes |
| `RESEND_API_KEY` | From [resend.com](https://resend.com/api-keys) — **required on Render free tier** (Gmail SMTP is blocked) | Yes |
| `EMAIL_FROM` | `Learning Tracker <onboarding@resend.dev>` (or your verified domain) | Yes |
| `GOOGLE_CLIENT_ID` | Same as Vercel `VITE_GOOGLE_CLIENT_ID` | Yes |
| `GOOGLE_CLIENT_SECRET` | From Google Cloud Console — not a placeholder | Yes |
| `FRONTEND_URL` | `https://learning-tracker-two-xi.vercel.app` | Yes |
| `REMINDER_TIMEZONE` | `Asia/Kolkata` (IST — covers all of India including Telangana) | Yes |
| `CRON_SECRET` | Long random string — **secret only, not a URL** | Yes |
| `ADMIN_EMAIL` | Admin inbox for issue reports | Recommended |

**Do not set** `EMAIL_USER` / `EMAIL_PASS` on Render — they force Gmail SMTP, which times out on the free tier.

**Verify email is wired after deploy:** open  
`https://learning-tracker-api-hqzm.onrender.com/api/health` — you should see  
`{"ok":true,"emailProvider":"resend"}`. If it says `"gmail"` or `"none"`, fix env vars and **Save, rebuild, and deploy**.

**Generate `CRON_SECRET` (run once locally):**

```bash
openssl rand -hex 32
```

Copy the output into Render **web service** env as `CRON_SECRET`. You will use the same value in **cron-job.org** (free) below — **do not** create a paid Render Cron Job.

---

## Free reminders — cron-job.org ($0)

**Skip Render Cron Job** (that costs money). Use this instead:

1. **Wake the API first** (Render free tier sleeps): open  
   `https://learning-tracker-api-hqzm.onrender.com/api/health` in your browser and wait until you see `{"ok":true,"emailProvider":"resend"}`

2. Go to [cron-job.org](https://cron-job.org) → sign up free → **Create cronjob**

3. Use **GET** and put your secret **in the URL** (cron-job.org validates the URL without custom headers, so POST + `Authorization` often shows *“This URL does not look to be valid”*):

| Field | Value |
|-------|--------|
| **Title** | Learning Tracker reminders |
| **URL** | `https://learning-tracker-api-hqzm.onrender.com/api/cron/reminders?secret=PASTE_CRON_SECRET_HERE` |
| **Schedule** | Every **5 minutes** |
| **Request method** | `GET` (default) |

Replace `PASTE_CRON_SECRET_HERE` with the exact `CRON_SECRET` from Render → API service → Environment.  
No spaces, no quotes, no `Bearer` — just the secret string after `?secret=`.

4. **Save** and **Enable** the job  
5. Open **History** after a few minutes — you should see **200** responses

**Alternative (Advanced tab):** POST with header `Authorization: Bearer YOUR_CRON_SECRET` — only if GET with `?secret=` still fails after waking the API.

**Test the exact URL in your browser** (replace secret):

```
https://learning-tracker-api-hqzm.onrender.com/api/cron/reminders?secret=YOUR_CRON_SECRET
```

You should see JSON like `{"ok":true,...}`. If that works in the browser, paste the same URL into cron-job.org.

---

## Paid option (optional) — Render Cron Job

Only if you prefer everything on Render (~$0.10–1.50/month). **Not required.**

| Variable | Value |
|----------|--------|
| `CRON_SECRET` | Same as web service |
| `API_URL` | `https://learning-tracker-api-hqzm.onrender.com/api/cron/reminders` |

Command: `node scripts/pingReminders.js` · Root: `server` · Schedule: `*/5 * * * *`

---

## Quick verification

```bash
# API health (emailProvider should be "resend")
curl https://learning-tracker-api-hqzm.onrender.com/api/health

# Sample reminder email (replace YOUR_CRON_SECRET)
curl 'https://learning-tracker-api-hqzm.onrender.com/api/cron/sample-reminder?secret=YOUR_CRON_SECRET&email=you@example.com'

# Reminders cron (replace YOUR_CRON_SECRET)
curl 'https://learning-tracker-api-hqzm.onrender.com/api/cron/reminders?secret=YOUR_CRON_SECRET'

# Local: who would get a reminder right now?
cd server && node scripts/verifyReminders.js
```

Expected: `{"ok":true,...}` or reminder skip stats — not `401` or `403`.

### Reminder checklist (must all be true)

1. **Render web** has `RESEND_API_KEY`, `EMAIL_FROM`, `CRON_SECRET`, `REMINDER_TIMEZONE=Asia/Kolkata`
2. `/api/health` returns `"emailProvider":"resend"`
3. **cron-job.org** pings `/api/cron/reminders` every 5 min (GET with `?secret=`)
4. User saved a **reminder time** in Settings
5. At least one daily goal has the **bell ON** and is **not completed**
6. `emailNotification` is not disabled on the user account

---

## Checklist

- [ ] Vercel: `VITE_API_BASE_URL` + `VITE_GOOGLE_CLIENT_ID` set, redeployed
- [ ] Vercel: `VITE_GA_MEASUREMENT_ID` set (optional)
- [ ] Render web: all variables above set
- [ ] **cron-job.org** (free): reminder ping every 5 min — not paid Render cron
- [ ] Google Cloud Console: OAuth authorized origins include `https://learning-tracker-two-xi.vercel.app`
- [ ] Test login on live site after redeploy

---

## Next (after env setup)

- Forgot password: `/forgot-password` → email link → `/reset-password?token=...` (requires `RESEND_API_KEY` or Gmail on Render).
