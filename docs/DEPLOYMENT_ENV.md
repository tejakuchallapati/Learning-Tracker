# Production environment variables

Set these in **Vercel** (frontend) and **Render** (API + cron) before launch.  
Use the same values from your local `server/.env` where noted — never commit secrets to git.

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

## Render — Web service (`devtrack-backend`)

Dashboard → your API service → **Environment**.

| Variable | Value | Required |
|----------|--------|----------|
| `NODE_ENV` | `production` | Yes |
| `PORT` | `5001` | Yes |
| `MONGO_URI` | MongoDB Atlas connection string (from `server/.env`) | Yes |
| `JWT_SECRET` | Long random string — **use a new secret for production**, not the dev default | Yes |
| `EMAIL_USER` | Gmail address for reminders | Yes |
| `EMAIL_PASS` | Gmail **app password** (not normal password) | Yes |
| `GOOGLE_CLIENT_ID` | Same as Vercel `VITE_GOOGLE_CLIENT_ID` | Yes |
| `FRONTEND_URL` | `https://learning-tracker-two-xi.vercel.app` | Yes |
| `REMINDER_TIMEZONE` | `Asia/Kolkata` (IST — covers all of India including Telangana) | Yes |
| `CRON_SECRET` | Long random string — **generate once, use in both web + cron** | Yes |
| `ADMIN_EMAIL` | Admin inbox for issue reports | Recommended |

**Generate `CRON_SECRET` (run once locally):**

```bash
openssl rand -hex 32
```

Copy the output into Render for **both** the web service and the cron job.

---

## Render — Cron job (`learning-tracker-reminders`)

If the cron service is not created yet: **New +** → **Cron Job**, or deploy from `render.yaml`.

| Variable | Value |
|----------|--------|
| `CRON_SECRET` | **Same value** as web service |
| `API_URL` | `https://learning-tracker-api-hqzm.onrender.com/api/cron/reminders` |

Schedule: `* * * * *` (every minute).

---

## Quick verification

```bash
# API health
curl https://learning-tracker-api-hqzm.onrender.com/api/health

# Reminders (replace YOUR_CRON_SECRET)
curl -X POST https://learning-tracker-api-hqzm.onrender.com/api/cron/reminders \
  -H "Authorization: Bearer YOUR_CRON_SECRET"
```

Expected: `{"ok":true,...}` or reminder skip stats — not `401` or `403`.

---

## Checklist

- [ ] Vercel: `VITE_API_BASE_URL` + `VITE_GOOGLE_CLIENT_ID` set, redeployed
- [ ] Vercel: `VITE_GA_MEASUREMENT_ID` set (optional)
- [ ] Render web: all variables above set
- [ ] Render cron: `CRON_SECRET` matches web service
- [ ] Google Cloud Console: OAuth authorized origins include `https://learning-tracker-two-xi.vercel.app`
- [ ] Test login on live site after redeploy

---

## Next (after env setup)

- Forgot password: `/forgot-password` → email link → `/reset-password?token=...` (requires `EMAIL_USER` / `EMAIL_PASS` on Render).
