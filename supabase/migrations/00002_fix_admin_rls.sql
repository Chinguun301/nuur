-- Fix admin login RLS chicken-and-egg problem
-- 
-- PROBLEM: The "Admin all users" policy requires the user to already be an admin
-- to read from the users table. But we need to read from users table to CHECK
-- if the user is an admin. This creates a circular dependency.
--
-- FIX: Allow any authenticated user to read their own record in the users table.
-- This way, on login, the user can read their own role without needing admin rights.
-- The "Admin all users" policy continues to work alongside this one (PostgreSQL RLS
-- returns a row if ANY permissive policy allows it).

-- Allow authenticated users to read their own record
CREATE POLICY "Users can read own record" ON users FOR SELECT USING (
  auth.role() = 'authenticated' AND id = auth.uid()
);

-- =============================================================================
-- IMPORTANT: Admin user setup
-- =============================================================================
-- The trigger `on_auth_user_created` auto-creates users with role = 'user'.
-- If your admin was created in Supabase Auth BEFORE this migration was applied,
-- or if you need to set a user as admin, run the following SQL in Supabase SQL Editor:
--
-- OPTION 1: Check if admin user exists in public.users
--   SELECT * FROM users WHERE email = 'your-admin-email@example.com';
--
-- OPTION 2: Insert admin user manually (if not created by trigger)
--   INSERT INTO users (id, email, role)
--   VALUES (
--     (SELECT id FROM auth.users WHERE email = 'your-admin-email@example.com'),
--     'your-admin-email@example.com',
--     'admin'
--   );
--
-- OPTION 3: Update existing user's role to admin
--   UPDATE users SET role = 'admin'
--   WHERE email = 'your-admin-email@example.com';
