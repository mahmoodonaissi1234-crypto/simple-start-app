## Goal
Create a ready-to-use demo account so you can log in without signing up.

**Credentials**
- Email: `demo@example.com`
- Password: `demo1234`
- Preselected plan: **Pro** (lands you straight on the dashboard)

## Steps
1. Create the auth user via a one-off SQL insert into `auth.users` with an already-confirmed email and a bcrypt-hashed password (using `crypt('demo1234', gen_salt('bf'))`). The existing `on_auth_user_created` trigger will auto-create the matching `profiles` row.
2. Set that profile's `plan` to `pro` so login goes directly to `/dashboard`.

Both actions run as a single `insert`-tool operation (no schema changes).

## Notes
- This is a dev-only convenience. If you want a different email, password, or plan (or Free so it lands on plan selection), say so and I'll adjust before running.
- Nothing in the app UI changes.
